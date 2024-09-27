//
//  TileViewController.swift
//  HumanSDKApp
//
//  Created by Gary Herman on 3/26/18.
//  Copyright © 2024 BioDigital Inc. All rights reserved.
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
    
    // model list with curated BioDigital content
    var bd_models = [
        HKModel(modelId: "production/femaleAdult/alzheimers_disease", title: "Alzheimers Disease", text: "", thumb: "https://human.biodigital.com/media/images/469e0d37-6088-4b64-8269-833b89d77a5b/small/image.jpg"),
        HKModel(modelId: "production/maleAdult/esophageal_varices", title: "Esophageal Varices", text: "", thumb: "https://human.biodigital.com/media/images/9b201b08-089e-44ac-8a80-9679453ffc3c/small/image.jpg"),
        HKModel(modelId: "production/maleAdult/posterior_total_hip_replacement", title: "Hip Replacement", text: "", thumb: "https://human.biodigital.com/media/images/05ba4b17-b49f-4cd9-b8be-cada95f41698/small/image.jpg"),
        HKModel(modelId: "production/maleAdult/cell", title: "Cell", text: "", thumb: "https://human.biodigital.com/media/images/b4f221d7-8863-4765-ade3-938dc248a18b/small/image.jpg"),
        HKModel(modelId: "production/maleAdult/contents_of_carotid_sheath_guided", title: "Carotid Sheath", text: "", thumb: "https://human.biodigital.com/media/images/c3541b60-afaf-4705-9e03-a6106b606749/small/image.jpg"),
        HKModel(modelId: "production/femaleAdult/breast_cancer_dark_skin", title: "Breast Cancer", text: "", thumb: "https://human.biodigital.com/media/images/e556e58f-ca21-4b38-8161-7ea1dac46f95/small/image.jpg"),
        HKModel(modelId: "production/maleAdult/kidney_stones_03", title: "Kidney Stones", text: "", thumb: "https://human.biodigital.com/media/images/f3af546a-1699-4304-a5b1-5b46bf6a03bc/small/image.jpg"),
        HKModel(modelId: "production/maleAdult/thrombolytics", title: "Thrombolytics", text: "", thumb: "https://human.biodigital.com/media/images/521a294b-ba36-4725-b69e-db713c35b801/small/image.jpg"),
        HKModel(modelId: "production/maleAdult/male_region_brain_19", title: "Brain", text: "", thumb: "https://human.biodigital.com/media/images/298286aa-a126-4ea2-a902-3b6716536dae/small/image.jpg"),
        HKModel(modelId: "production/maleAdult/skin_tissue", title: "Skin", text: "", thumb: "https://human.biodigital.com/media/images/ee7db82f-2228-40c3-a427-769168bb98df/small/image.jpg")
    ]
    
    var client_models = [HKModel]()
    
    var models = [HKModel]()
    
    // setting for the .all option in HKUIOptions for the HKHuman
    // see HKUI for ui options to customize our viewer UI to suit your needs
    var uiAll = true
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        super.viewDidLoad()
        
        view.frame = UIScreen.main.bounds
        view.backgroundColor = .white
        
        let height = UIScreen.main.bounds.height
        let width = UIScreen.main.bounds.width
        
        let labelFrame = CGRect(x: 0, y: 80, width: width, height: 30)
        label = UILabel(frame: labelFrame)
        label.textAlignment = .center
        label.backgroundColor = .humanRed
        label.text = "SDK Sample Library"
        view.addSubview(label)
        
        let tileFrame = CGRect(x:0,y:110,width:width,height:height-110)
        let tileLayout = UICollectionViewFlowLayout()
        var inset : CGFloat = 40.0
        if width > 800 {
            inset = 60.0
        }
        tileLayout.sectionInset = UIEdgeInsets(top: inset, left: inset, bottom: inset, right: inset)
        tileLayout.itemSize = CGSize(width: 144, height: 186)
        tileLayout.minimumInteritemSpacing = 40
        tileLayout.minimumLineSpacing = 20
        tiles = UICollectionView(frame: tileFrame, collectionViewLayout: tileLayout)
        
        tiles.backgroundColor = .white
        
        tiles.register(ModelTile.self, forCellWithReuseIdentifier: "tile")
        tiles.delegate = self
        tiles.dataSource = self
        
        models.append(contentsOf: bd_models)
        
        view.addSubview(tiles)
                
        human = HKHuman(view: canvasView, options: [.all : uiAll])
    }
    
    func modelsLoaded() {
        print("content library models loaded")
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
        let width = size.width
        let labelFrame = CGRect(x: 0, y: 0, width: width, height: height*0.2)
        label.frame = labelFrame
        let tileFrame = CGRect(x:0,y:height*0.2,width:width,height:height*0.8)
        tiles.frame = tileFrame
        tiles.collectionViewLayout.invalidateLayout()
        humanVC?.viewWillTransition(to: size, with: coordinator)
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.2) {
            if let vc = self.humanVC {
                self.canvasView.frame = vc.canvasView.bounds
            }
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
        let storyboard = UIStoryboard(name: "Main", bundle: nil)
        humanVC = storyboard.instantiateViewController(withIdentifier: "threedee") as? HumanViewController
        humanVC.modalPresentationStyle = .fullScreen
        humanVC.nativeUI = !uiAll
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
            inset = 60.0
        }
        return UIEdgeInsets(top: inset, left: inset, bottom: inset, right: inset)
    }
    
}
