// swift-tools-version: 6.0
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "human-kit",
    platforms: [
            .macOS(.v13),
            .iOS(.v15),
        ],
    products: [
        .library(
            name: "human-kit",
            targets: ["human-kit", "HumanKit"]),
    ],
    targets: [
        .target(
            name: "human-kit", path:"."),
        .binaryTarget(name: "HumanKit", path: "./HumanKit.xcframework")
    ]
)
