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
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        label = UILabel(frame: CGRect(x:0,y:200,width:200,height:60))
        label?.textAlignment = .center
        label?.numberOfLines = 0
        label?.lineBreakMode = .byWordWrapping
        label?.textColor = .humanRed
        thumbnail = UIImageView(frame:CGRect(x: 0, y: 0, width: 200, height: 200))
        addSubview(label!)
        addSubview(thumbnail!)
    }
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder:aDecoder)
    }
    
    func setModel(model: HKModel) {
        self.model = model
        label?.text = model.title
        var thumbname = model.thumbnail
        // the content API modules will have online thumbnails, here the gray background shows hardcoded demo modules
        backgroundColor = UIColor.init(red: 199.0/255.0, green: 199.0/255.0, blue: 199.0/255.0, alpha: 1.0)
        if thumbname.starts(with: "https") {
            let indexStartOfText = model.thumbnail.index(model.thumbnail.startIndex, offsetBy: 29)
            thumbname = String(model.thumbnail.suffix(from: indexStartOfText))
            backgroundColor = .clear
        }
        if let image = UIImage(named: thumbname) {
            thumbnail?.image =  image
        } else {
            let fileManager = FileManager.default
            let thumbsurl = try! fileManager.url(for: .documentDirectory, in: .userDomainMask, appropriateFor: nil, create: true).appendingPathComponent("thumbnails")
            try! fileManager.createDirectory(at: thumbsurl, withIntermediateDirectories: true, attributes: nil)
            let fileURL = try! fileManager.url(for: .documentDirectory, in: .userDomainMask, appropriateFor: nil, create: true).appendingPathComponent(thumbname)
            if fileManager.fileExists(atPath: fileURL.path) {
                thumbnail?.image = UIImage(contentsOfFile: fileURL.path)
            } else {
                guard let url = URL(string: model.thumbnail) else { return }
                DispatchQueue.global().async {
                    do {
                        let data = try? Data(contentsOf: url)
                        if let data = data, let image = UIImage(data: data) {
                            DispatchQueue.main.async {
                                self.thumbnail?.image = image
                            }
                            try data.write(to: fileURL)
                        }
                    } catch {
                    }
                }
            }
        }
    }
}
