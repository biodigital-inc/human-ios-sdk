//
//  ModuleTile.swift
//  HumanSDKApp
//
//  Created by Gary Herman on 3/26/18.
//  Copyright © 2018 BioDigital Inc. All rights reserved.
//

import UIKit
import HumanKit

class ModelTile : UICollectionViewCell {
    var model : HKModel?
    var thumbnail : UIImageView?
    var label : UILabel?
    var downloaded = false

    override init(frame: CGRect) {
        super.init(frame: frame)
        label = UILabel(frame: CGRect(x:0,y:144,width:144,height:42))
        label?.textAlignment = .center
        label?.numberOfLines = 0
        label?.lineBreakMode = .byWordWrapping
        label?.textColor = .humanRed
        label?.backgroundColor = .clear
        thumbnail = UIImageView(frame:CGRect(x: 0, y: 0, width: 144, height: 144))
        addSubview(label!)
        addSubview(thumbnail!)
    }
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder:aDecoder)
    }
    
    func setModel(model: HKModel) {
        self.model = model
        label?.text = model.title
        // the content API modules will have thumbnail URLs
        // otherwise look up the bookmark location by modelId
        var modelID = model.modelId
        // try to determine the correct thumbnail
        if model.thumbnail.isEmpty {
            if modelID.contains(".json") {
                let index = modelID.firstIndex(of: ".")!
                modelID = String(modelID[modelID.startIndex..<index])
            }
            let basedir = modelID.contains("/") ? "modules/" : "bookmarks/"
            model.thumbnail = "https://human.biodigital.com/thumbs/" + basedir + modelID + "/small/index.jpg"
        }
        var thumbname = model.thumbnail
        backgroundColor = .humanGray40
        if thumbname.starts(with: "https") {
            let indexStartOfText = model.thumbnail.index(model.thumbnail.startIndex, offsetBy: 29)
            thumbname = String(model.thumbnail.suffix(from: indexStartOfText))
        }
        if let image = UIImage(named: thumbname) {
            thumbnail?.image =  image
        } else {
            let fileManager = FileManager.default
            let fileURL = try! fileManager.url(for: .documentDirectory, in: .userDomainMask, appropriateFor: nil, create: true).appendingPathComponent(thumbname)
            try! fileManager.createDirectory(at: fileURL.deletingLastPathComponent(), withIntermediateDirectories: true, attributes: nil)
            if fileManager.fileExists(atPath: fileURL.path) {
                thumbnail?.image = UIImage(contentsOfFile: fileURL.path)
            } else {
                guard let url = URL(string: model.thumbnail) else { return }
                DispatchQueue.global().async {
                    do {
                        let data = try? Data(contentsOf: url)
                        if let data = data, let image = UIImage(data: data) {
                            DispatchQueue.main.async {
                                print("got thumbnail \(model.thumbnail)")
                                self.thumbnail?.image = image
                            }
                            try data.write(to: fileURL)
                        }
                    } catch {
                        print("error saving thumb \(fileURL.absoluteString)")
                    }
                }
            }
        }
        if HKServices.shared.modelDownloaded(id: modelID) {
            dprint("\(model.modelId) is downloaded")
            backgroundColor = .green
            downloaded = true
        } else {
            dprint("\(model.modelId) is not downloaded")
        }
    }
}
