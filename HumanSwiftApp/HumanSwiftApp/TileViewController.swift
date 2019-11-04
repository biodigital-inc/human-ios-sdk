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
    
    var tiles : UICollectionView!
    var label : UILabel!
    var human : HumanViewController?
    
    var searchICD : UISearchBar?
    var searchCat : UISearchBar?

    // modules list UI
    var bd_modules = [HKModule(moduleID: "production/maleAdult/human_02_regional_male_head_neck.json", title: "Head and Neck", info: "", thumb: "human_02_regional_male_head_neck"),
                   HKModule(moduleID: "production/maleAdult/human_02_regional_male_thorax.json", title: "Thorax", info: "", thumb: "human_02_regional_male_thorax"),
                   HKModule(moduleID: "production/maleAdult/ear_cross_section_coronal.json", title: "Ear: Coronal Cross Section", info: "", thumb: "ear_cross_section_coronal"),
                   HKModule(moduleID: "production/maleAdult/atherosclerosis_total_occlusion.json", title: "Atheriosclerosis: Total Occlusion", info: "", thumb: "atherosclerosis_total_occlusion"),
                   HKModule(moduleID: "production/maleAdult/hemorrhagic_stroke.json", title: "Hemorrhagic Stroke", info: "", thumb: "hemorrhagic_stroke"),
                   HKModule(moduleID: "production/maleAdult/breathing_dynamics.json", title: "Breathing Dynamics", info: "", thumb: "breathing_dynamics")]
    
    var client_modules = [HKModule]()
    
    var modules = [HKModule]()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        view.frame = UIScreen.main.bounds
        view.backgroundColor = .white
        
        let height = UIScreen.main.bounds.height;
        let width = UIScreen.main.bounds.width;
        
        let labelFrame = CGRect(x: 0, y: 30, width: width, height: 30)
        label = UILabel(frame: labelFrame)
        label.textAlignment = .center
        label.text = "SDK Sample Library"
        view.addSubview(label)

        let tileFrame = CGRect(x:0,y:60,width:width,height:height-140)
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
        
        tiles.register(ModuleTile.self, forCellWithReuseIdentifier: "tile")
        tiles.delegate = self
        tiles.dataSource = self
        
        modules.append(contentsOf: bd_modules)
        
        view.addSubview(tiles)
    }
    
    func modulesLoaded() {
        print("modules loaded")
        if client_modules.count == 0 {
            client_modules.append(contentsOf: AppDelegate.shared.humankit.modules)
        }
        if AppDelegate.shared.humankit.modules.count > 0 {
            modules.append(contentsOf: AppDelegate.shared.humankit.modules)
            tiles.reloadData()
        } else {
            let action = UIAlertController(title: "Search didn't match any ICD or Specialty name", message: "Please try again", preferredStyle: .alert)
            action.addAction(UIAlertAction(title: "OK", style: .cancel, handler: nil))
            present(action, animated: true, completion: nil)
            modules.append(contentsOf: bd_modules)
            modules.append(contentsOf: client_modules)
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
        human?.viewWillTransition(to: size, with: coordinator)
    }
    
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return modules.count
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "tile", for: indexPath) as! ModuleTile
        cell.setModule(module: modules[indexPath.row])
        return cell
    }
    
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        human = storyboard?.instantiateViewController(withIdentifier: "threedee") as? HumanViewController
        human!.modalPresentationStyle = .fullScreen
        present(human!, animated: true) {
            self.human!.showModule(which: self.modules[indexPath.row])
        }
    }
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, insetForSectionAt section: Int) -> UIEdgeInsets {
        var inset : CGFloat = 40.0
        if collectionView.frame.width > 800 {
            inset = 120.0
        }
        return UIEdgeInsets(top: 40, left: inset, bottom: 40, right: inset)
    }

    
}
