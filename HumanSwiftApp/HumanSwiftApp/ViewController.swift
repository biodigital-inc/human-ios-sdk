//
//  ViewController.swift
//  HumanSDKApp
//
//  Created by Gary Herman on 1/11/18.
//  Updated 2/21/18
//  Copyright © 2018 BioDigital Inc. All rights reserved.
//
import UIKit
import HumanKit

class ViewController: UIViewController, UITableViewDelegate, UITableViewDataSource, HumanBodyDelegate {
    
    // sample app UI
    var button : UIButton!
    @IBOutlet weak var modelLabel: UILabel!

    // required for HumanKit
    @IBOutlet weak var canvasView: UIView!
    var body : HumanBody!

    // the module array and table for display
    var modules = [Module]()
    var moduleTable : UITableViewController?
    
    // the module translation map
    var lookupArabicTitles = [String:String]()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // required SDK setup
        body = HumanBody(view: canvasView)
        body.delegate = self

        var headerheight : CGFloat = 0.0
        if UIDevice().userInterfaceIdiom == .phone {
            switch UIScreen.main.nativeBounds.height {
            case 1136:
                print("iPhone 5 or 5S or 5C")
            case 1334:
                print("iPhone 6/6S/7/8")
            case 1920, 2208:
                print("iPhone 6+/6S+/7+/8+")
            case 2436:
                print("iPhone X")
                headerheight = 20
            default:
                print("unknown")
            }
        }
        
        // module list table setup
        moduleTable = UITableViewController(style: .plain)
        moduleTable?.tableView.delegate = self
        moduleTable?.tableView.dataSource = self
        moduleTable?.tableView.frame = CGRect(x:0, y:44 + headerheight, width:self.view.frame.size.width, height:self.view.frame.size.height-88)
        moduleTable?.tableView.register(UITableViewCell.self, forCellReuseIdentifier: "cell")
        self.view.addSubview((moduleTable?.tableView)!)
        moduleTable!.tableView.isHidden = true

        // do the search
        readLookupFile()
        searchBioDigitalContent()
        
        // add a button to hide/show the table
        button = UIButton(frame: CGRect(x: 0, y: headerheight, width: self.view.frame.size.width, height: 60))
        button.addTarget(self, action: #selector(showMenu), for: .touchUpInside)
        self.view.addSubview(button)
    }
    
    // hide/show the table
    @objc func showMenu() {
        moduleTable!.tableView.isHidden = !moduleTable!.tableView.isHidden
        if moduleTable!.tableView.isHidden {
            button.setTitle("show module list", for: .normal)
        } else {
            button.setTitle("hide module list", for: .normal)
        }
    }
    
    // MARK: HumanBodyDelegate callback functions
    //      these are called in a background thread, make sure to update your UI in the main thread!
    
    func onInvalidSDK() {
        print("INVALID SDK KEY?!  your sdk key failed validation")
        body.loadIndex {
            print("hi there")
        }
    }
    
    func onObjectSelected(objectId: String, view: HumanBody) {
        print("selected \(objectId)")
    }
    
    func onChapterTransition(chapterId: String, view: HumanBody) {
//        if let chapter : Chapter = body.chapters[chapterId] {
//            print("this chapter: \(chapter.title)")
//        }
    }
    
    func onValidSDK() {
        DispatchQueue.main.async {
            self.goRandom()
        }
    }

    // the load function will return when the module is fully loaded
    func showModel(which: Module?) {
        modelLabel.text = "Loading \(which!.title)..."
        body.load(model: which!.moduleID) {
            self.modelLabel.text = which!.title
        }
    }
    
    // helper function to pick a next module at random
    // NOTE: i like to load flu by default if the search isn't complete.  you can load whatever you want
    func goRandom() {
        if ( modules.count > 0 ) {
            let pick = Int(arc4random_uniform(UInt32(modules.count)))
            print("picked \(pick) out of \(modules.count)")
            showModel(which: self.modules[pick])
        } else {
            let module = Module(moduleID:"production/maleAdult/flu.json", title:"Flu", info:"production/maleAdult/flu.json")
            showModel(which:module)
        }
    }
    
    // table view controller delegate and data functions
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        let module = self.modules[indexPath.row]
        print("load \(module.moduleID)")
        showMenu()
        showModel(which: module)
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return modules.count
    }
    
    func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "cell", for: indexPath)
        let module = modules[indexPath.row]
        cell.textLabel?.text = module.title
        return cell
    }

    
    // process lookup file
    func readLookupFile() {
        let filePath = Bundle.main.url(forResource: "biodigital_arabic", withExtension: "csv")
        do {
            let contents = try String(contentsOf: filePath!)
            let lines = contents.components(separatedBy: "\n")
            for line in lines {
                let bits = line.components(separatedBy: ",")
                if bits.count > 2 {
                    let english = bits[1]
                    let arabic = bits[2]
                    lookupArabicTitles[english] = arabic
                }
            }
//            print("there are \(lookupArabicTitles.count) lookups")
        } catch {
            print("error processing title lookup file")
        }
    }
    // search content
    func searchBioDigitalContent() {
        modules = [Module]()
        let url = URL(string: "https://human.biodigital.com/search?t=!obsolete")
//        print("search")
        var urlReq = URLRequest(url: url!, cachePolicy: NSURLRequest.CachePolicy.reloadIgnoringLocalCacheData, timeoutInterval: 320000)
        urlReq.httpMethod = "GET"
        let task = URLSession.shared.dataTask(with: urlReq, completionHandler: { data, response, error in
            if let error = error {
                print("Error while trying to search content: \(error)")
            } else if let response = response as? HTTPURLResponse,
                300..<600 ~= response.statusCode {
                print("Error while trying to load the url at \(url!), statusCode: \(response.statusCode)")
            } else {
                do {
                    if let searchResults = try JSONSerialization.jsonObject(with: data!, options: []) as? NSDictionary {
                        if let resultArray = searchResults["results"] as? NSArray {
                            for result in resultArray {
                                if let rez = result as? NSDictionary {
                                    let title = rez["title"] as! String
                                    let modulename = rez["module_name"] as! String
                                    let created = rez["create_date_time"] as! String
                                    let arabic = self.lookupArabicTitles[title] != nil ? self.lookupArabicTitles[title]! : title
                                    let module = Module(moduleID: modulename, title: arabic, info: created)
                                    self.modules.append(module)
                                }
                            }
                        }
                    }
                } catch {
                    print("error parsing search data")
                }
//                print("found \(self.modules.count) valid modules")
                DispatchQueue.main.async {
                    self.button.setTitle("show module list", for: .normal)
                    self.moduleTable?.tableView.reloadData()
                }
            }
        })
        task.resume()
    }
}

