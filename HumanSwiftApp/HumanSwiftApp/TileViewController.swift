//
//  TileViewController.swift
//  HumanSDKApp
//
//  Created by Gary Herman on 3/26/18.
//  Copyright © 2018 BioDigital Inc. All rights reserved.
//

import UIKit
import HumanKit

class TileViewController : UIViewController, UICollectionViewDelegate, UICollectionViewDataSource, UICollectionViewDelegateFlowLayout, UISearchBarDelegate {
    
    // HumanKit SDK HKHuman and view
    @IBOutlet weak var canvasView: UIView!
    var human : HKHuman!

    var tiles : UICollectionView!
    var label : UILabel!
    var humanVC : HumanViewController!
    
    var searchICD : UISearchBar?
    var searchCat : UISearchBar?

    // modules list UI
    var bd_models = [
        HKModel(modelId: "production/maleAdult/breathing_beating_heart_v02", title: "Breathing Beating Heart", text: "", thumb: ""),
        HKModel(modelId: "production/maleAdult/acne_tissue_nodule", title: "Acne Tissue Nodule", text: "", thumb: ""),
        HKModel(modelId: "production/maleAdult/acne", title: "Acne", text: "", thumb: ""),
        HKModel(modelId: "production/femaleAdult/alveoli_smoker", title: "Alveoli Smoker", text: "", thumb: ""),
        HKModel(modelId: "production/maleAdult/male_region_brain_13", title: "Brain", text: "", thumb: ""),
        HKModel(modelId: "production/maleAdult/atherosclerosis_total_occlusion", title: "Atheriosclerosis: Total Occlusion", text: "", thumb: ""),
        HKModel(modelId: "production/maleAdult/bladder_cancer_v02", title: "Bladder Cancer", text: "", thumb: "")
    ]
    
    var client_models = [HKModel]()
    
    var models = [HKModel]()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        super.viewDidLoad()
        
        view.frame = UIScreen.main.bounds
        view.backgroundColor = .white
        
        let height = UIScreen.main.bounds.height;
        let width = UIScreen.main.bounds.width;
        
        let labelFrame = CGRect(x: 0, y: 30, width: width, height: 30)
        label = UILabel(frame: labelFrame)
        label.textAlignment = .center
        label.backgroundColor = .humanRed
        label.text = "SDK Sample Library"
        view.addSubview(label)
        
        let tileFrame = CGRect(x:0,y:60,width:width,height:height-100)
        let tileLayout = UICollectionViewFlowLayout()
        var inset : CGFloat = 40.0
        if width > 800 {
            inset = 120.0
        }
        tileLayout.sectionInset = UIEdgeInsets(top: 40, left: inset, bottom: 40, right: inset)
        tileLayout.itemSize = CGSize(width: 200, height: 260)
        tileLayout.minimumInteritemSpacing = 40
        tileLayout.minimumLineSpacing = 40
        tiles = UICollectionView(frame: tileFrame, collectionViewLayout: tileLayout)
        
        tiles.backgroundColor = .white
        
        tiles.register(ModelTile.self, forCellWithReuseIdentifier: "tile")
        tiles.delegate = self
        tiles.dataSource = self
        
        models.append(contentsOf: bd_models)
        
        view.addSubview(tiles)
        
        #if DEBUG
        let uiAll = false
        #else
        let uiAll = true
        #endif
        
        human = HKHuman(view: canvasView, options: [HumanUIOptions.all:uiAll])

    }
    
    func modulesLoaded() {
        print("models loaded")
        if client_models.count == 0 {
            client_models.append(contentsOf: HKServices.shared.models)
        }
        if HKServices.shared.models.count > 0 {
            models.append(contentsOf: HKServices.shared.models)
            tiles.reloadData()
        } else {
            let action = UIAlertController(title: "Search didn't match any ICD or Specialty name", message: "Please try again", preferredStyle: .alert)
            action.addAction(UIAlertAction(title: "OK", style: .cancel, handler: nil))
            present(action, animated: true, completion: nil)
            models.append(contentsOf: bd_models)
            models.append(contentsOf: client_models)
            tiles.reloadData()
        }
    }
    
    override func viewWillTransition(to size: CGSize, with coordinator: UIViewControllerTransitionCoordinator) {
        let height = size.height
        let width = size.width;
        let labelFrame = CGRect(x: 0, y: 0, width: width, height: height*0.2)
        label.frame = labelFrame
        let tileFrame = CGRect(x:0,y:height*0.2,width:width,height:height*0.8)
        tiles.frame = tileFrame
        tiles.collectionViewLayout.invalidateLayout()
        humanVC?.viewWillTransition(to: size, with: coordinator)
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.2) {
            self.canvasView.frame = self.humanVC.canvasView.bounds
        }
    }
    
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return models.count
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "tile", for: indexPath) as! ModelTile
        cell.setModel(model: models[indexPath.row])
        return cell
    }
    
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        //        searchICD!.text = ""
        //        searchCat!.text = ""
                let storyboard = UIStoryboard(name: "Main", bundle: nil)
                humanVC = storyboard.instantiateViewController(withIdentifier: "threedee") as? HumanViewController
                humanVC.modalPresentationStyle = .fullScreen
                present(humanVC, animated: true) {
                    // setup HKHuman delegate and set view
                    self.humanVC.canvasView.addSubview(self.canvasView)
                    self.canvasView.frame = self.humanVC.canvasView.bounds
                    self.humanVC.showModel(with: self.human, which: self.models[indexPath.row])
                }
    }
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, insetForSectionAt section: Int) -> UIEdgeInsets {
        var inset : CGFloat = 40.0
        if collectionView.frame.width > 800 {
            inset = 120.0
        }
        return UIEdgeInsets(top: 40, left: inset, bottom: 40, right: inset)
    }
    
    func searchBarCancelButtonClicked(_ searchBar: UISearchBar) {
        print("cancel")
        searchBar.resignFirstResponder()
        models.removeAll()
        models.append(contentsOf: bd_models)
        tiles.reloadData()
    }
    
    func searchBarSearchButtonClicked(_ searchBar: UISearchBar) {
        searchBar.resignFirstResponder()
        if let text = searchBar.text {
            if text.lengthOfBytes(using: .utf8) > 0 {
                models.removeAll()
                tiles.reloadData()
                var sendtext = text
                if (searchBar == searchICD) {
                    sendtext = "ICD:" + text
                }
                HKServices.shared.findModel(ICD: sendtext)
            }
        } else {
            models.removeAll()
            models.append(contentsOf: bd_models)
            tiles.reloadData()
        }
    }
    
}
