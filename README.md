# HumanKit
The BioDigital Human iOS SDK

Current version: 2.75.1 Released September 7, 2022

Version numbers are now tied to the release version of the internal 3D anatomy viewer.

Please visit http://developer.biodigital.com for documentation and setup instructions, and http://human.biodigital.com to see the 3D Human

To test the Sample Apps, clone the repo or download the ZIP and run 'pod install --repo-update' in the project directories.

Our Apple Research Kit integration is the file ORKBioDigitalModelManager.swift

NOTE: You'll need to generate an API key in our developer site and put your credentials into the Sample Apps to view our 3D content.

<hr>

To install the HumanKit framework into your own app, add the following to your Podfile:

at the top level add:
source 'https://github.com/biodigital-inc/human-ios-sdk.git'

to your app target add:
pod 'HumanKit'

for a specific version:
pod 'HumanKit', '2.75.1'

for a universal build:
pod 'HumanKit', '2.75.1-universal'
