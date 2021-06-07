//
//  ORKHumanModelBiodigitalManager.swift
//  HumanResearchKit
//
//  Created by BioDigital on 5/13/20.
//  Copyright © 2020 BioDigital. All rights reserved.
//

import ResearchKit
import HumanKit

public enum ORKHumanModelBioDigitalModelType : String {
    case heart = "production/maleAdult/breathing_beating_heart_v02"
    case brain = "production/maleAdult/brain_v02"
    case head = "production/maleAdult/male_region_head_07"
    case torn_meniscus = "production/maleAdult/torn_medial_meniscus"
}

public class ORKBioDigitalModelManager : ORK3DModelManager {

    public var xray = false
    public var grayscale = false
    public var objectsToHide: [String]?

    private var modelId = ""
    private var human : HKHuman!
    private var selectedObject = ""
    private var _annos = [String:HKAnnotation]()  // map objectId to annotation
    
    public func load(modelType: ORKHumanModelBioDigitalModelType) {
        modelId = modelType.rawValue
    }
    
    public func load(modelId: String) {
        self.modelId = modelId
    }

    public func annotate(objectId: String, title: String, text: String) {
        let anno = HKAnnotation(objectId: objectId)
        anno.annotationId = "annotation\(_annos.count)"
        anno.title = title
        anno.text = text
        _annos[objectId] = anno
    }
        
    // ORKHumanModelManager functions
        
    override init() {
        HKServices.shared.setup()
        super.init()
    }
    
    required init?(coder: NSCoder) {
        HKServices.shared.setup()
        super.init()
    }
    
    public override func addContent(to view: UIView) {
        human = HKHuman(view: view)
        human.delegate = self
        human.load(model: modelId)
    }
    
    public override func provideResults() -> [ORKResult]? {
        let result = ORKResult()
        result.identifier = selectedObject
        return [result]
    }
    
    public override func stepWillEnd() {
        human.unload()
    }
        
}

extension ORKBioDigitalModelManager : HKHumanDelegate {
    
    // when the scene is initalized handle setting up the scene based on the variables set by the developer
    public func human(_ view: HKHuman, initScene: String) {
        self.perform(#selector(initializeScene), with: nil, afterDelay: 0.01)
   }
    
    @objc private func initializeScene() {
        if xray {
            let xraycolor = HKColor()
            xraycolor.saturation = -1.0
            xraycolor.opacity = 0.55
            for objId in human.scene.objectIds {
                human.scene.color(objectId: objId, color: xraycolor)
            }
        } else if grayscale {
            let xraycolor = HKColor()
            xraycolor.saturation = -1.0
            for objId in human.scene.objectIds {
                    human.scene.color(objectId: objId, color: xraycolor)
            }
        }
        if let objects = self.identifiersOfObjectsToHighlight {
            let objColor = HKColor()
            if let hilite = self.highlightColor {
                objColor.tint = hilite
                for objId in objects {
                    self.human.scene.color(objectId: objId, color: objColor)
                }
            }
        }
        if let objects = self.objectsToHide {
            human.scene.hide(objectIds: objects)
        }
        if !self.allowsSelection {
            human.scene.disablePicking()
            setContinueEnabled(true)
        }
        for (_,value) in _annos {
            human.annotations.create(annotation: value)
        }
    }
    
    // enable continue when an object in the scene is selected
    public func human(_ view: HKHuman, objectSelected: String) {
        // get the display name of the selected object for the result
        selectedObject = human.scene.objects[objectSelected] ?? ""
        setContinueEnabled(true)
    }
}

