//
//  ViewController.swift
//  HumanSDKApp
//
//  Created by Gary Herman on 1/11/18.
//  Copyright © 2018 BioDigital Inc. All rights reserved.
//
import UIKit
import HumanKit
import simd

class HumanViewController: UIViewController, HKHumanDelegate {

    // required by HumanKit SDK
    @IBOutlet weak var canvasView: UIView!
    var human : HKHuman!

    // module info label
    @IBOutlet weak var modelLabel: UILabel!
    
    // some application state,
    var xrayMode = false
    var dissectMode = false
    var isolateMode = false
    var paintMode = false
    var paused = false
    var currentTime : Float = 0.0
    var maxTime : Float = 0.0
    var timer = Timer()
    
    // native UI elements to interact with the SDK
    @IBOutlet weak var resetButton: UIButton!
    @IBOutlet weak var shareButton: UIButton!
    @IBOutlet weak var xrayButton: UIButton!
    @IBOutlet weak var dissectButton: UIButton!
    @IBOutlet weak var isolateButton: UIButton!
    @IBOutlet weak var undoButton: UIButton!
    @IBOutlet weak var infoButton: UIButton!
    @IBOutlet weak var playPauseButton: UIButton!
    @IBOutlet weak var animationSlider: UISlider!
    
    // paint ui elements
    @IBOutlet weak var paintButton: UIButton!
    @IBOutlet weak var paintView : UIView!
    @IBOutlet weak var redButton : UIButton!
    @IBOutlet weak var greenButton : UIButton!
    @IBOutlet weak var blueButton : UIButton!
    @IBOutlet weak var yellowButton : UIButton!
    @IBOutlet weak var unpaintButton : UIButton!

    lazy var swipeChaptersView : SwipeChaptersView = {
        let scv = SwipeChaptersView(frame: CGRect(x: 0, y: UIScreen.main.bounds.height - 108, width: UIScreen.main.bounds.width, height: 40))
        return scv
    }()
    
    lazy var spinner : UIActivityIndicatorView = {
        let spinny = UIActivityIndicatorView()
        spinny.color = .humanRed
        spinny.hidesWhenStopped = true
        spinny.style = .whiteLarge
        return spinny
    }()

    var paintColor : HKColor? = nil;
    
    lazy var redColor : HKColor = {
        let col = HKColor()
        col.tint = UIColor.red
        return col
    }()

    lazy var blueColor : HKColor = {
        let col = HKColor()
        col.tint = UIColor.blue
        col.opacity = 0.66
        return col
    }()
    
    lazy var greenColor : HKColor = {
        let col = HKColor()
        col.tint = UIColor.green
        col.saturation = 0.5
        return col
    }()
    
    lazy var yellowColor : HKColor = {
        let col = HKColor()
        col.tint = UIColor.yellow
        return col
    }()

    override func viewDidLoad() {
        super.viewDidLoad()
        
        // set up the SDK's view and set ourselves as the delegate
        // the nativeUI flag turns on/off the native app layer UI elements, which demonstrate some of the SDK 
        let nativeUI = false
        let noUI = false
        canvasView.backgroundColor = .clear
        if nativeUI || noUI {
            human = HKHuman(view: canvasView, options: [HumanUIOptions.all:false])
        } else {
            human = HKHuman(view: canvasView)
        }
        if !nativeUI {
            xrayButton.isHidden = true
            dissectButton.isHidden = true
            isolateButton.isHidden = true
            resetButton.isHidden = true
            shareButton.isHidden = false
            swipeChaptersView.isHidden = true
            paintButton.isHidden = true
            shareButton.isHidden = true
        }
        paintView.isHidden = true
        playPauseButton.isHidden = true
        animationSlider.isHidden = true
        animationSlider.setThumbImage(UIImage(named: "AppIcon40x40"), for: .normal)
        human.delegate = self
        view.addSubview(swipeChaptersView)
    }

    // tell the info panel to resize itself when the device is rotated
    override func viewWillTransition(to size: CGSize, with coordinator: UIViewControllerTransitionCoordinator) {
        swipeChaptersView.frame = CGRect(x: 0, y: size.height - 108, width: size.width, height: 40)
        let newSize = CGSize(width: size.width, height: 40)
        swipeChaptersView.initChapters(human: human!, size: newSize)
    }
    
    func runTimer() {
        timer.invalidate()
        if #available(iOS 10.0, *) {
            timer = Timer.scheduledTimer(withTimeInterval: 0.03, repeats: true, block: { (elapsed) in
                self.animationSlider.value = self.human.timeline.currentTime
            })
        } else {
                    // Fallback on earlier versions
        }
    }

    // the load function will return when the module is fully loaded
    func showModule(which: HKModule?) {
        modelLabel.text = "Loading \(which!.title)..."
        swipeChaptersView.clear()
        view.addSubview(spinner)
        spinner.center = view.center
        spinner.isHidden = false
        spinner.startAnimating()
        spinner.color = .humanRed
        human.load(model: which!.moduleID) {
            self.spinner.stopAnimating()
            self.swipeChaptersView.initChapters(human: self.human)
            self.modelLabel.text = ""
// some fun methods using the sdk
//            self.randomBackgroundColor()
//            self.randomHighlightColor()
        }
    }

    @IBAction func home() {
        dismiss(animated: true, completion: nil)
    }

    // MARK: HKHumanDelegate callback functions
    
    // these methods are optional, you do not need to implement them
    func onValidSDK() {
//        print("VALID SDK!, we can load stuff now")
    }
    
    func onAnimationComplete() {
        playPauseButton.setImage(UIImage(named:"play"), for: .normal)
        paused = false
    }
    
    func onInvalidSDK() {
        print("INVALID SDK KEY?!  please validate your sdk to continue")
    }
    
    func onObjectSelected(objectId: String, view: HKHuman) {
        if paintView.isHidden { return }
        if let painter = paintColor {
            human.scene.colorObject(id: objectId, color: painter)
        } else {
            human.scene.uncolorObject(id: objectId)
        }
//        let name : String = view.getDisplayName(objectID: objectId)
//        print("selected '\(name)':\(objectId)")
    }
    
    func onChapterTransition(chapterId: String, view: HKHuman) {
//        if let chapter = view.chapters[chapterId] {
//            print("this chapter: \(chapter)")
//        }
    }
    
    // buttons can call into the SDK
    
    @IBAction func playPause() {
        if (human.timeline.playing()) {
            human.timeline.pause()
            playPauseButton.setImage(UIImage(named:"play"), for: .normal)
        } else {
            if paused {
                human.timeline.unpause()
            } else {
                human.timeline.play()
            }
            runTimer()
            playPauseButton.setImage(UIImage(named:"pause"), for: .normal)
        }
        paused = !paused
    }
    
    @IBAction func startScrub() {
        human.timeline.pause()
        timer.invalidate()
    }
    
    @IBAction func scrubbed(slider: UISlider) {
        timer.invalidate()
        human.timeline.moveToTime(time: slider.value)
    }
    
    @IBAction func endScrub() {
        if !paused {
            human.timeline.unpause()
            runTimer()
        }
    }
    
    @IBAction func share() {
        human.scene.share(from: shareButton.frame)
    }
    
    @IBAction func xrayToggle() {
        xrayMode = !xrayMode;
        human.scene.xray(enabled: xrayMode)
        if xrayMode {
            xrayButton.layer.shadowColor = UIColor.yellow.cgColor
            xrayButton.layer.shadowRadius = 2
            xrayButton.layer.shadowOpacity = 0.8
        } else {
            xrayButton.layer.shadowColor = UIColor.clear.cgColor
            xrayButton.layer.shadowOpacity = 0.0
            xrayButton.layer.shadowRadius = 0
        }
    }
    
    @IBAction func dissectToggle() {
        if (paintMode ) {
            paintPressed()
        }
        dissectMode = !dissectMode;
        human.scene.dissect(enabled: dissectMode)
        if dissectMode {
            dissectButton.layer.shadowColor = UIColor.white.cgColor
            dissectButton.layer.shadowRadius = 8
            dissectButton.layer.shadowOffset = CGSize(width: -2, height: -2)
            dissectButton.layer.shadowOpacity = 0.8
            undoButton.isHidden = false
        } else {
            dissectButton.layer.shadowColor = UIColor.clear.cgColor
            dissectButton.layer.shadowOpacity = 0.0
            dissectButton.layer.shadowRadius = 0
            undoButton.isHidden = true
        }
    }
    
    @IBAction func isolateToggle() {
        isolateMode = !isolateMode;
        human.scene.isolate(enabled:isolateMode)
        if isolateMode {
            isolateButton.layer.shadowColor = UIColor.red.cgColor
            isolateButton.layer.shadowRadius = 8
            isolateButton.layer.shadowOffset = CGSize(width: -2, height: -2)
            isolateButton.layer.shadowOpacity = 0.8
        } else {
            isolateButton.layer.shadowColor = UIColor.clear.cgColor
            isolateButton.layer.shadowOpacity = 0.0
            isolateButton.layer.shadowRadius = 0
        }
    }
    
    @IBAction func undoDissect() {
        human.scene.undo()
    }
    
    @IBAction func resetButtonPressed() {
        human.scene.reset()
        isolateMode = false
        xrayMode = false
        dissectMode = false
        xrayButton.layer.shadowColor = UIColor.clear.cgColor
        xrayButton.layer.shadowOpacity = 0.0
        xrayButton.layer.shadowRadius = 0
        isolateButton.layer.shadowColor = UIColor.clear.cgColor
        isolateButton.layer.shadowOpacity = 0.0
        isolateButton.layer.shadowRadius = 0
        dissectButton.layer.shadowColor = UIColor.clear.cgColor
        dissectButton.layer.shadowOpacity = 0.0
        dissectButton.layer.shadowRadius = 0
        undoButton.isHidden = true
    }
    
    // MARK: API test functions
    
    // test orbit fn
    @IBAction func orbit() {
        human.camera.orbit(yaw:-10, pitch:0, duration: 0.5);
    }
    
    func reset() {
        self.modelLabel.text = ""
    }
    
    // some fun random color functions which call into the SDK
    func randomBackgroundColor() {
        let a : CGFloat = CGFloat(arc4random_uniform(255))/255.0
        let b : CGFloat = CGFloat(arc4random_uniform(255))/255.0
        let c : CGFloat = CGFloat(arc4random_uniform(255))/255.0
        let d : CGFloat = CGFloat(arc4random_uniform(255))/255.0
        let e : CGFloat = CGFloat(arc4random_uniform(255))/255.0
        let f : CGFloat = CGFloat(arc4random_uniform(255))/255.0
        let g : CGFloat = CGFloat(arc4random_uniform(255))/255.0
        let h : CGFloat = CGFloat(arc4random_uniform(255))/255.0
        let topColor = UIColor(red: a, green: b, blue: c, alpha: d)
        let bottomColor = UIColor(red: e, green: f, blue: g, alpha: h)
        human.scene.setBackgroundColor(top: topColor, bottom: bottomColor, type: .linear)
    }
    
    // select and zoom to a random object in the scene
    func selectRandomObject() {
        let bound : UInt32 = UInt32(self.human.scene.objectIDs.count)
        let which = Int(arc4random_uniform(bound))
        let objectID = self.human.scene.objectIDs[which]
        print("let's select " + objectID)
        self.human.scene.selectObject(objectID: objectID)
        self.human.camera.animateTo(objectId: objectID)
    }
    
    // pick some random colors and call the setHighlightColor function
    func randomHighlightColor() {
        let a : CGFloat = CGFloat(arc4random_uniform(255))/255.0
        let b : CGFloat = CGFloat(arc4random_uniform(255))/255.0
        let c : CGFloat = CGFloat(arc4random_uniform(255))/255.0
        let d : CGFloat = CGFloat(arc4random_uniform(255))/255.0
        let highlight = UIColor(red: a, green: b, blue: c, alpha: d)
        human.scene.setHighlightColor(color: highlight)
    }
    
    // Object painting API test functions
    @IBAction func paintPressed() {
        if (dissectMode) {
            dissectToggle()
        }
        paintMode = !paintMode
        paintView.isHidden = !paintView.isHidden
        if paintView.isHidden { human.scene.enableHighlight() }
        else { human.scene.disableHighlight() }
    }
    
    @IBAction func setPaintColor(button:UIButton) {
        switch button {
        case redButton:
            paintColor = redColor
            human.scene.disableHighlight()
        case blueButton:
            paintColor = blueColor
            human.scene.disableHighlight()
        case greenButton:
            paintColor = greenColor
            human.scene.disableHighlight()
        case yellowButton:
            paintColor = yellowColor
            human.scene.disableHighlight()
        case unpaintButton:
            paintColor = nil
            human.scene.enableHighlight()
        default:
            paintColor = nil
            human.scene.enableHighlight()
        }
        if let col = paintColor {
            paintButton.layer.borderColor = col.tint.cgColor
            paintButton.layer.borderWidth = 2
            paintButton.layer.masksToBounds = true
        } else {
            paintButton.layer.borderWidth = 0
            paintButton.layer.masksToBounds = false
        }
    }

}

