var decoderModule = {};
var dracoDecoderType = {};
var nativeAttributeMap = {
    'positions' : 'POSITION',
    'normals' : 'NORMAL',
    'colors' : 'COLOR',
    'uvs' : 'TEX_COORD'
};
var decoderAvailable = false;
var targetQueue = [];

var wasmReady = (typeof WebAssembly === "object" && typeof WebAssembly.instantiate === "function");
if (wasmReady){
    importScripts("draco_wasm_wrapper.js");
    loadWebAssemblyDecoder(startDecoding);
} else {
    importScripts('draco_decoder.js');
    createDecoderModule(startDecoding);
}

// receive draco-blob from asset parser
self.onmessage = function(event) {
    startDecoding({
        dracoBlob: event.data[0],
        geometryId: event.data[1],
        cfg: event.data[2],
        geometry: {}
    });
};

// decode any asset sent to worker before the DracoDecoder is available
function startDecoding(data){
    data = (!!data)? data : targetQueue.pop();

    if (!decoderAvailable){
        // add to queue and wait for  decoder to be available
        targetQueue.push(data);
    } else if (data){
        // decode blob and message back to asset loader
        var decoded = dracoDecode(data.dracoBlob, data.cfg.geometry, data.geometryId);
        if (decoded){
            postMessage([1, data.geometryId, data.cfg]);
        }
    }

};

/* interact with dracoDecoder API to decode draco-blob into biodigital asset.
 Adapted from https://github.com/google/draco#javascript-decoder-api
*/
function dracoDecode(arrayBuffer, geometry, geometryId){
    // Create the Draco decoder.
    var byteArray = new Int8Array(arrayBuffer);
    var buffer = new decoderModule.DecoderBuffer();
    buffer.Init(byteArray, byteArray.length);
    // Create a buffer to hold the encoded data.
    var decoder = new decoderModule.Decoder();
    var geometryType = decoder.GetEncodedGeometryType(buffer);
    // Decode the encoded geometry.
    var dracoGeometry;
    var status;
    if (geometryType == decoderModule.TRIANGULAR_MESH) {
        dracoGeometry = new decoderModule.Mesh();
        status = decoder.DecodeBufferToMesh(buffer, dracoGeometry);
    }
    else {
        postMessage([0, geometryId, 'Non triangular mesh found in draco asset']);
        return false;
    }
    var numofPoints = dracoGeometry.num_points();
    var numofFaces = dracoGeometry.num_faces();

    //positions and uvs: Uint16Array(vertices and texcoords); normals: int8Array
    for (var attributeName in nativeAttributeMap) {
        var attId = decoder.GetAttributeId(dracoGeometry, decoderModule[nativeAttributeMap[attributeName]]);
        if (attId !== -1) {
            var attribute = decoder.GetAttribute(dracoGeometry, attId);
            if(attributeName == 'positions') {
                geometry.positions = addAttributeToMesh(decoderModule, decoder, dracoGeometry, attributeName, Uint16Array, attribute);
            }
            else if(attributeName == 'uvs') {
                geometry.uvs = [];
                geometry.uvs[0] = addAttributeToMesh(decoderModule, decoder, dracoGeometry, attributeName, Uint16Array, attribute);
            }
            else if(attributeName == 'normals') {
                geometry.normals = addAttributeToMesh(decoderModule, decoder, dracoGeometry, attributeName, Int8Array, attribute);
            }
            else {
                //console.log("something went wrong...");
            }
        }
    }

    if (geometryType == decoderModule.TRIANGULAR_MESH) {
        var numPositions = geometry.positions.length / 3;
        if (numPositions < 256){
            geometry.indices = new Uint8Array(numofFaces * 3);
        } else if (numPositions < 65536){
            geometry.indices = new Uint16Array(numofFaces * 3);
        } else {
            geometry.indices = new Uint32Array(numofFaces * 3);
        }

        var ia = new decoderModule.DracoInt32Array();
        for (var i = 0; i < numofFaces; ++i) {
            decoder.GetFaceFromMesh(dracoGeometry, i, ia);
            var index = i * 3;
            geometry.indices[index] = ia.GetValue(0);
            geometry.indices[index + 1] = ia.GetValue(1);
            geometry.indices[index + 2] = ia.GetValue(2);
        }
        decoderModule.destroy(ia);
    }

    // You must explicitly delete objects created from the DracoDecoderModule or Decoder.
    decoderModule.destroy(dracoGeometry);
    decoderModule.destroy(decoder);
    decoderModule.destroy(buffer);

    return true
}

// get typed array data from draco decoder mesh
function addAttributeToMesh(decoderModule, decoder, dracoGeometry, attributeName, attributeType, attribute){
    if (attribute.ptr === 0) {
        var errorMsg = 'No attribute' + attributeName;
        console.error(errorMsg);
        throw new Error(errorMsg);
    }

    var numComponents = attribute.num_components();
    var numPoints = dracoGeometry.num_points();
    var numValues = numPoints * numComponents;
    var attributeData;
    var type;

    switch ( attributeType ) {
        case Float32Array:
            attributeData = new decoderModule.DracoFloat32Array();
            decoder.GetAttributeFloatForAllPoints(dracoGeometry, attribute, attributeData);
            type = new Float32Array(numValues);
            break;

        case Int8Array:
            attributeData = new decoderModule.DracoInt8Array();
            decoder.GetAttributeInt8ForAllPoints(dracoGeometry, attribute, attributeData );
            type = new Int8Array( numValues );
            break;

        case Int16Array:
            attributeData = new decoderModule.DracoInt16Array();
            decoder.GetAttributeInt16ForAllPoints(dracoGeometry, attribute, attributeData);
            type = new Int16Array( numValues );
            break;

        case Int32Array:
            attributeData = new decoderModule.DracoInt32Array();
            decoder.GetAttributeInt32ForAllPoints(dracoGeometry, attribute, attributeData);
            type = new Int32Array( numValues );
            break;

        case Uint8Array:
            attributeData = new decoderModule.DracoUInt8Array();
            decoder.GetAttributeUInt8ForAllPoints(dracoGeometry, attribute, attributeData);
            type = new Uint8Array( numValues );
            break;

        case Uint16Array:
            attributeData = new decoderModule.DracoUInt16Array();
            decoder.GetAttributeUInt16ForAllPoints(dracoGeometry, attribute, attributeData);
            type = new Uint16Array( numValues );
            break;

        case Uint32Array:
            attributeData = new decoderModule.DracoUInt32Array();
            decoder.GetAttributeUInt32ForAllPoints(dracoGeometry, attribute, attributeData);
            type = new Uint32Array( numValues );
            break;
    }

    // Copy data from decoder.
    for (var i = 0; i < numValues; i++) {
        type[i] = attributeData.GetValue(i);
    }
    return type;
}

// fetch web assembly decoder
function loadWebAssemblyDecoder(callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'draco_decoder.wasm', true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function() {
        // For WebAssembly the object passed into DracoDecoderModule() must contain a
        // property with the name of wasmBinary and the value must be an
        // ArrayBuffer containing the contents of the .wasm file.
        dracoDecoderType.wasmBinaryFile = 'draco_decoder.wasm';
        dracoDecoderType.wasmBinary = xhr.response;
        createDecoderModule(callback);
    };
    xhr.send(null);
}

/* create the decoder object for decoding draco blobs now that DracoDecoderModule is available
 draco_decoder.js or draco_wasm_wrapper.js must be loaded before
*/
function createDecoderModule(callback) {
    dracoDecoderType.onModuleLoaded = function(module) {
        //start decode here
        decoderAvailable = true;
        callback();
    };
    decoderModule = DracoDecoderModule(dracoDecoderType);
}
