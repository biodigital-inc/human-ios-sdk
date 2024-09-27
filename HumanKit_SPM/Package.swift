// swift-tools-version: 6.0
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "HumanKit",
    platforms: [
        .iOS(.v12)
    ],
    products: [
        .library(
            name: "HumanKit",
            targets: ["HumanKit"]),
    ],
    targets: [
        .target(
            name: "HumanKit"),
        .binaryTarget(name: "HumanKit", path: "./Sources/HumanKit.xcframework")
    ]
)
