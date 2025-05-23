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
    var human : HKHuman?
    
    // set this to hide the built in UI and show native elements to interact with the scene
    var nativeUI = false
    
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
    
    // module loading label
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
    var size = CGSize()
    var hiddenObjectIds = [String]()
    
    // chapter info panel
    lazy var swipeChaptersView : SwipeChaptersView = {
        let scv = SwipeChaptersView(frame: CGRect(x: 0, y: UIScreen.main.bounds.height - 108, width: UIScreen.main.bounds.width, height: 40))
        return scv
    }()
    
    var paintColor : HKColor? = nil
    
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
        canvasView!.backgroundColor = .clear
        canvasView.autoresizesSubviews = true
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
        view.addSubview(swipeChaptersView)
    }
    
    // tell the info panel to resize itself when the device is rotated
    override func viewWillTransition(to size: CGSize, with coordinator: UIViewControllerTransitionCoordinator) {
        self.size = size
        swipeChaptersView.initChapters(human: human!, size: size)
    }
    
    func runTimer() {
        timer.invalidate()
        if #available(iOS 10.0, *) {
            timer = Timer.scheduledTimer(withTimeInterval: 0.03, repeats: true, block: { (elapsed) in
                self.animationSlider.value = self.human!.timeline.currentTime
            })
        }
    }
    
    // call human.load(<modelID>) to load a model
    func showModel(with: HKHuman, which: HKModel?) {
        human = with
        human!.delegate = self
        modelLabel.isHidden = false
        modelLabel.text = "Loading \(which!.title)..."
        swipeChaptersView.clear()
        human!.load(model: which!.modelId)
    }
    
    @IBAction func home() {
        human!.unload()
        timer.invalidate()
        dismiss(animated: true, completion: nil)
    }
    
    // MARK: HKServicesDelegate callback functions
    
    func onValidSDK() {
        print("developer key validated")
    }
    
    func onInvalidSDK() {
        print("unable to validate developer key.  please check your bundle id and key are valid at https://developer.biodigital.com")
    }
    
    // MARK: HKHumanDelegate callback functions
    
    // these callbacks are all optional
    
    // modelLoaded fires when the model is completely loaded
    func human(_ view: HKHuman, modelLoaded: String) {
        self.swipeChaptersView.initChapters(human: self.human!)
        self.modelLabel.text = ""
        print("model loaded: " + modelLoaded)
    }
    
    func human(_ view: HKHuman, quizEnabled: Bool) {
        if (quizEnabled) {
            print("This model has a quiz. There are \(view.quiz.questions.count) quiz questions")
            view.quiz.enter()
        }
    }
    
    func human(_ view: HKHuman, quizEntered: Bool) {
        print("Got quiz entered callback: \(quizEntered)")
    }
    
    func human(_ view: HKHuman, quizExited: Bool) {
        print("Got quiz exited callback: \(quizExited)")
    }
    
    func human(_ view: HKHuman, quizQuestionLoaded: String) {
        print("Quiz question loaded \(quizQuestionLoaded)")
        print("The question is: \(view.quiz.questions[quizQuestionLoaded]!.questionPrompt)")
    }
    
    func human(_ view: HKHuman, quizAnswerSelected: [String]) {
        print("Got quiz answer selected callback")
        for  answer in quizAnswerSelected {
            if let answerString = view.quiz.questions[view.quiz.activeQuestionId]!.answers[answer] {
                print("you selected an answer \(answerString)")
            } else {
                print("your answer was \(answer)")
            }
        }
    }

    func human(_ view: HKHuman, quizAnswerSubmitted: HKQuizSubmission?) {
        var success = "unknown"
        if let submitted = quizAnswerSubmitted {
            success = submitted.correct ? "correct" : "incorrect"
        }
        print("Got quiz answer submitted callback, the answer was \(success)")
    }
    
    func human(_ view: HKHuman, quizCompleted: Double) {
        print("Got quiz complete callback, the score is \(quizCompleted)")
    }

    // initScene callback fires when the scene meta data is available
    func human(_ view: HKHuman, initScene: String) {
        print("init scene " + initScene)
    }

    func human(_ view: HKHuman, modelLoadError: String) {
        print("error loading model \(modelLoadError)")
        let action = UIAlertController(title: "Error Loading Model \(modelLoadError)", message: "Something went wrong, please try again.", preferredStyle: .alert)
        action.addAction(UIAlertAction(title: "OK", style: .cancel, handler: nil))
        self.present(action, animated: true, completion: nil)
        home()
    }
        
    func human(_ view: HKHuman, animationComplete: Bool) {
        playPauseButton.setImage(UIImage(named:"play"), for: .normal)
        paused = false
    }
    
    func human(_ view: HKHuman, objectPicked: String, position: [Double]) {
        if let obj = human!.scene.objects[objectPicked] {
            print("you selected \(obj) \(dissectMode)")
            if dissectMode {
                human!.scene.hide(objectIds: [objectPicked])
                hiddenObjectIds.append(objectPicked)
                return
            }
            if paintView.isHidden { return }
            if let painter = paintColor {
                human!.scene.color(objectId: objectPicked, color: painter)
            } else {
                human!.scene.uncolor(objectId: objectPicked)
            }
            human!.scene.getColor(objectId: objectPicked);
        }
    }
    
    func human(_ view: HKHuman, objectColor: String, color: HKColor) {
        print("got color for object " + objectColor)
    }
    
    // fires on chapter transitions
    func human(_ view: HKHuman, chapterTransition: String) {
        if let chapter = view.timeline.chapters[chapterTransition] {
            print("this chapter: \(chapter.title)")
            if self.human!.timeline.playing && nativeUI {
                self.maxTime = self.human!.timeline.duration
                self.playPauseButton.setImage(UIImage(named:"pause"), for: .normal)
                self.playPauseButton.isHidden = false
                self.animationSlider.isHidden = false
                self.animationSlider.maximumValue = self.maxTime
                self.animationSlider.value = self.human!.timeline.currentTime
                self.runTimer()
            }
        }
    }
    
    // share handler for the draw tool
    func human(_ view: HKHuman, shareImage: UIImage) {
        let sharer = UIActivityViewController(activityItems: [shareImage], applicationActivities: nil)
        sharer.excludedActivityTypes = []
        sharer.popoverPresentationController?.sourceRect = canvasView.frame
        sharer.popoverPresentationController?.sourceView = canvasView
        self.present(sharer, animated: true) {}
    }

    
    // buttons can call into the SDK
    @IBAction func playPause() {
        if human!.timeline.playing {
            human!.timeline.pause()
            playPauseButton.setImage(UIImage(named:"play"), for: .normal)
        } else {
            if paused {
                human!.timeline.unpause()
            } else {
                human!.timeline.play()
            }
            runTimer()
            playPauseButton.setImage(UIImage(named:"pause"), for: .normal)
        }
        paused = !paused
    }
    
    @IBAction func startScrub() {
        human!.timeline.pause()
        timer.invalidate()
    }
    
    @IBAction func scrubbed(slider: UISlider) {
        timer.invalidate()
        human!.timeline.moveToTime(time: slider.value)
    }
    
    @IBAction func endScrub() {
        if !paused {
            human!.timeline.unpause()
            runTimer()
        }
    }
    
    @IBAction func share() {
        human!.scene.share(from: shareButton.frame)
    }
    
    @IBAction func xrayToggle() {
        xrayMode = !xrayMode
        human!.scene.xray(xrayMode)
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
        if paintMode {
            paintPressed()
        }
        dissectMode = !dissectMode
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
        isolateMode = !isolateMode
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
        if dissectMode && hiddenObjectIds.count > 0 {
            human!.scene.show(objectIds: [hiddenObjectIds.removeLast()])
        }
    }
    
    @IBAction func resetButtonPressed() {
        human!.scene.reset()
        human!.camera.reset()
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
    
    
    // Object painting API test functions
    @IBAction func paintPressed() {
        if dissectMode {
            dissectToggle()
        }
        paintMode = !paintMode
        paintView.isHidden = !paintView.isHidden
        if paintView.isHidden { human!.scene.enableHighlight() }
        else { human!.scene.disableHighlight() }
    }
    
    @IBAction func setPaintColor(button:UIButton) {
        switch button {
        case redButton:
            paintColor = redColor
            human!.scene.disableHighlight()
        case blueButton:
            paintColor = blueColor
            human!.scene.disableHighlight()
        case greenButton:
            paintColor = greenColor
            human!.scene.disableHighlight()
        case yellowButton:
            paintColor = yellowColor
            human!.scene.disableHighlight()
        case unpaintButton:
            paintColor = nil
            human!.scene.enableHighlight()
        default:
            paintColor = nil
            human!.scene.enableHighlight()
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

