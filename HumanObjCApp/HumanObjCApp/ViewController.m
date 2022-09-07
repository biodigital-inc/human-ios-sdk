//
//  ViewController.m
//  objcapp
//
//  Created by Gary Herman on 4/16/18.
//  Copyright © 2018 BioDigital Inc. All rights reserved.
//

#import "ViewController.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    body = [[HKHuman alloc] initWithView:self.view];
    [body setupUIWithOption:HumanUIOptionsAll value:true];
    body.delegate = self;
}

-(void)viewDidAppear:(BOOL)animated {
    [super viewDidAppear:animated];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
}

-(void)loadSampleModule {
    [body loadWithModel:@"production/maleAdult/human_02_regional_male_thorax.json"];
}

-(void)human:(HKHuman *)view modelLoaded:(NSString *)modelLoaded {
    if (self && self->body) {
        NSString *title = [self->body.scene title];
        NSLog(@"title = %@",title);
    }
}

-(void)human:(HKHuman *)view objectSelected:(NSString *)objectSelected {
    NSLog(@"you selected %@", self->body.scene.objects[objectSelected]);
}

@end
