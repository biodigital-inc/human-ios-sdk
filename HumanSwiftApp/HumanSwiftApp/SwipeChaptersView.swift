//
//  SwipeChaptersView.swift
//  HumanSDKApp
//
//  Created by Gary Herman on 3/8/18.
//  Copyright © 2018 BioDigital Inc. All rights reserved.
//

import UIKit
import HumanKit


class SwipeChaptersView : UIView, UIScrollViewDelegate, UITextViewDelegate {
    
    var descriptionScrollView : UIScrollView!
    var currentPage = -1
    var chapters = [HKChapter]()
    var human : HKHuman?
    var expanded : UILabel?
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        self.descriptionScrollView = UIScrollView(frame: frame)
    }
    
    required init?(coder aDecoder: NSCoder) {
        super.init(coder:aDecoder)
        self.descriptionScrollView = UIScrollView(frame: self.frame)
    }
    
    func clear() {
        for subview in descriptionScrollView.subviews {
            if subview.isKind(of:UIView.self) {
                subview.removeFromSuperview()
            }
        }
    }
    
    func initChapters(human:HKHuman) {
        currentPage = 0
        initChapters(human: human, size: frame.size)
    }
        
    func initChapters(human:HKHuman, size: CGSize) {
        self.human = human

        let width = size.width * 0.82
        let height = size.height
        let offset = size.width * 0.03
        let margin = offset * 3.0
        
        clear()

        descriptionScrollView.frame = CGRect(x: margin, y: 0, width: size.width - (2.0 * margin), height: height)
        addSubview(descriptionScrollView)

        descriptionScrollView.backgroundColor = .clear
        descriptionScrollView.delegate = self
        descriptionScrollView.isPagingEnabled = true

        chapters = human.timeline.chapters.values.sorted(by: {$0.index < $1.index})
        let totalChapters = human.timeline.chapters.count
        for i in 0..<totalChapters {
            let chapter = chapters[i]
            let container = UIView(frame: CGRect(x: offset + (width*CGFloat(i)), y: 1, width: width - (2.0*offset), height: height-2))
            container.backgroundColor = UIColor.white.withAlphaComponent(0.75)
           
            let titleLabel = UILabel(frame: CGRect(x: 32, y: 0, width: container.frame.size.width-64, height: 42))
            titleLabel.font = UIFont.init(name: "HelveticaNeue-Medium", size: 18)
            titleLabel.adjustsFontSizeToFitWidth = true
            titleLabel.text = chapter.title
            titleLabel.backgroundColor = .clear
            titleLabel.textAlignment = .center
            titleLabel.textColor = .humanRed
            
            let label = UILabel(frame: CGRect(x: 14, y: 42, width: container.frame.size.width-28, height: 0))
            label.font = UIFont.init(name: "HelveticaNeue", size: 16)
            var attrString : NSMutableAttributedString = NSMutableAttributedString(string: "")
            do {
                attrString = try NSMutableAttributedString(data: chapter.text.data(using:String.Encoding.utf8)!, options: [.documentType: NSAttributedString.DocumentType.html, .characterEncoding: String.Encoding.utf8.rawValue], documentAttributes: nil)
                let attrDict = [NSAttributedString.Key.font:label.font!]
                attrString.beginEditing()
                attrString.setAttributes(attrDict, range: NSMakeRange(0, attrString.length))
                attrString.endEditing()
                label.attributedText = attrString
            } catch {
                label.text = chapter.text
            }
            
            label.backgroundColor = .clear
            label.numberOfLines = 0
            label.lineBreakMode = .byTruncatingTail
            label.textColor = .black
            label.tag = 99
            label.textAlignment = .left
            label.backgroundColor = .clear
            container.addSubview(label)
            container.addSubview(titleLabel)

            let textMaxSize = CGSize(width: label.frame.width, height:.greatestFiniteMagnitude)
            let box = attrString.boundingRect(with: textMaxSize, options: .usesLineFragmentOrigin, context: nil)

//            if box.height > label.frame.size.height+12 {
                let expandButton = UILabel(frame:  CGRect(x: container.frame.size.width - 40, y: 0, width: 36, height: 42))
                expandButton.tag = 0
                expandButton.font = UIFont.init(name: "HelveticaNeue", size: 12)
                expandButton.textColor = .darkGray
                expandButton.text = "info"
                expandButton.isUserInteractionEnabled = true
                expandButton.textAlignment = .right
                expandButton.backgroundColor = .clear
                
                let tap = UITapGestureRecognizer(target: self, action: #selector(expand(recognizer:)))
                expandButton.addGestureRecognizer(tap)
                
                container.addSubview(expandButton)
                container.tag = Int(box.height) + 12
//            }

            descriptionScrollView.addSubview(container)
        }
        
        descriptionScrollView.clipsToBounds = false
        descriptionScrollView.showsVerticalScrollIndicator = false
        descriptionScrollView.contentSize = CGSize(width: (width*CGFloat(totalChapters)), height: height)
        if currentPage < 1 {
            descriptionScrollView.contentOffset = .zero
        } else {
            descriptionScrollView.contentOffset = CGPoint(x:(width*CGFloat(currentPage)), y: 0)
        }
    }
    
    @objc func expand(recognizer:UITapGestureRecognizer) {
        let sender : UILabel = recognizer.view as! UILabel
        let parent = sender.superview
        var label : UIView? = nil
        for subview in (parent?.subviews)! {
            if subview.isKind(of:UILabel.self) && subview.tag == 99 {
                label = subview
            }
        }
        if sender.tag == 0 {
            self.expanded = sender
        } else {
            self.expanded = nil
        }
        UIView.animate(withDuration: 0.25, animations: {
            let diff = CGFloat(parent!.tag)
            if sender.tag == 0 {
                sender.tag = 1
                sender.text = "close"
                var ff = parent!.frame
                ff.size.height += (diff + 14)
                parent!.frame = ff
                
                var f = label!.frame
                f.size.height += (diff + 14)
                label!.frame = f

                var gggg = self.descriptionScrollView.frame
                gggg.size.height += (diff + 14)
                self.descriptionScrollView.frame = gggg
                self.descriptionScrollView.contentSize = CGSize( width:self.descriptionScrollView.contentSize.width,  height:self.descriptionScrollView.contentSize.height + (diff + 14))
                
                var sdf = self.frame
                sdf.size.height += (diff + 14)
                sdf.origin.y -= (diff + 14)
                self.frame = sdf
            } else {
                sender.tag = 0
                sender.text = "info"
                var ff = parent!.frame
                ff.size.height -= (diff + 14)
                parent!.frame = ff

                var f = label!.frame
                f.size.height -= (diff + 14)
                label!.frame = f
                
                var gggg = self.descriptionScrollView.frame
                gggg.size.height -= (diff + 14)
                self.descriptionScrollView.frame = gggg
                self.descriptionScrollView.contentSize = CGSize( width:self.descriptionScrollView.contentSize.width, height: self.descriptionScrollView.contentSize.height - (diff + 14))

                var sdf = self.frame
                sdf.size.height -= (diff + 14)
                sdf.origin.y += (diff + 14)
                self.frame = sdf

            }
        }) { (finished) in
            label?.setNeedsLayout()
        }
    }

    func scrollViewDidEndDecelerating(_ scrollView: UIScrollView) {
        let point = scrollView.panGestureRecognizer.translation(in: scrollView.superview)
        if let ex = expanded  {
            if point.x != 0 {
                expand(recognizer: ex.gestureRecognizers![0] as! UITapGestureRecognizer)
            }
        }
        if point.x > 0 {
            human?.timeline.prevChapter()
            currentPage -= 1
        } else if ( point.x < 0 ) {
            human?.timeline.nextChapter()
            currentPage += 1
        }
    }
    
}
