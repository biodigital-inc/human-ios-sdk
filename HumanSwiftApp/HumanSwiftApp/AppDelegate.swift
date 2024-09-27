//
//  AppDelegate.swift
//  HumanSDKApp
//
//  Created by Gary Herman on 1/11/18.
//  Copyright © 2018 BioDigital Inc. All rights reserved.
//

import UIKit

import HumanKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate, HKServicesDelegate {
    
    var window: UIWindow?
    var tiles : TileViewController?

    static var shared : AppDelegate {
        return UIApplication.shared.delegate as! AppDelegate
    }
    
    //
    // NOTE: you will need to enter a valid SDK key (and optional secret) to match the bundle id you set up at https://developer.biodigital.com
    
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        HKServices.shared.setup(delegate: self)
        tiles = window!.rootViewController as? TileViewController
        return true
    }
    
    func onValidSDK() {
        print("valid SDK!")
        // once your SDK is validated, you may want to call the Content API to pull your library models
        //  only do this if you are loading dynamic content from your content library
        // HKServices.shared.getModels()
    }
    
    func onInvalidSDK() {
        print("invalid SDK!")
    }
    
    func modelsLoaded() {
        tiles!.modelsLoaded()
    }
    
    func applicationDidEnterBackground(_ application: UIApplication) {
    }
    
    func applicationWillEnterForeground(_ application: UIApplication) {
    }
    
    func applicationWillResignActive(_ application: UIApplication) {
    }
    
    func applicationDidBecomeActive(_ application: UIApplication) {
    }
    
    func applicationWillTerminate(_ application: UIApplication) {
    }
}

func dprint(_ object: Any) {
    #if DEBUG
    Swift.print(object)
    #endif
}
