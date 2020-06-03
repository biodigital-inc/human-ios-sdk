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
    // Do any additional setup after loading the view, typically from a nib.
    body = [[HKHuman alloc] initWithView:self.view];
    [body setupUIWithOption:HumanUIOptionsAll value:true];
    body.delegate = self;
}

-(void)viewDidAppear:(BOOL)animated {
    [super viewDidAppear:animated];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

-(void)loadSampleModule {
    NSLog(@"loading...");
    [body loadWithModel:@"production/maleAdult/human_02_regional_male_thorax.json"];
}

-(void)human:(HKHuman *)view modelLoaded:(NSString *)modelLoaded {
    if (self && self->body) {
        NSString *title = [self->body.scene title];
        NSLog(@"title = %@",title);
    }
}

-(void)human:(HKHuman *)view objectSelected:(NSString *)objectSelected {
    HKColor *color = [[HKColor alloc] init: [UIColor blueColor]];
    color.opacity = 0.66;
    [[body scene] colorWithObjectId:objectSelected color:color];
}


@end
