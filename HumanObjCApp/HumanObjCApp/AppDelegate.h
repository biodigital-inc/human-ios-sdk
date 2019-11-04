//
//  AppDelegate.h
//  objcapp
//
//  Created by Gary Herman on 4/16/18.
//  Copyright © 2018 BioDigital Inc. All rights reserved.
//

#import <UIKit/UIKit.h>
@import HumanKit;

@interface AppDelegate : UIResponder <UIApplicationDelegate, HKServicesDelegate> {
    HKServices *humankit;
}

@property (strong, nonatomic) UIWindow *window;


@end

