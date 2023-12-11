import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Constants from 'expo-constants';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { QRData } from '../components';
import { COLORS, SIZES } from '../constants';

const Scanner = ({ navigation }) => {

  const [hasPermission, setHasPermission] = useState(null)
  const [screen, setScreen] = useState('scan');
  const [scanned, setScanned] = useState(false)
  const [sizeQrCode, setSizeQrCode] = useState({ width: 0, height: 0 });
  const [token, setToken] = useState(null)
  const [initialRender, setInitialRender] = useState(true);

  const lineAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, [])

  useEffect(() => {
    handleAnimationLine();
  }, []);

  useEffect(()=>{
    if (initialRender) {
      setInitialRender(false);
      return;
    }
    setScreen('data');
  }, [token])

  const onLineLayout = (event) => {
    const { x, y, height, width } = event.nativeEvent.layout;
    setSizeQrCode({ width: width, height: height });
  }

  const handleAnimationLine = () => {
    lineAnim.setValue(0);
    Animated.timing(lineAnim, {
      toValue: 1,
      duration: 8000,
      useNativeDriver: false,
    }).start(() => handleAnimationLine());
  };

  const transformLine = lineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, sizeQrCode?.height],
  });

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setToken(data);
    console.log(data);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text style={styles.main}>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text style={styles.main}>No access to camera</Text>;
  }

  const EdgeQRCode = ({ position }) => {
    const edgeWidth = 20;
    const edgeHeight = 20;
    const edgeColor = '#FFF';
    const edgeBorderWidth = 4;
    const edgeRadius = 0;

    const defaultStyle = {
      width: edgeWidth,
      height: edgeHeight,
      borderColor: edgeColor,
    };
    const edgeBorderStyle = {
      topRight: {
        borderRightWidth: edgeBorderWidth,
        borderTopWidth: edgeBorderWidth,
        borderTopRightRadius: edgeRadius,
        top: edgeRadius,
        right: edgeRadius,
      },
      topLeft: {
        borderLeftWidth: edgeBorderWidth,
        borderTopWidth: edgeBorderWidth,
        borderTopLeftRadius: edgeRadius,
        top: edgeRadius,
        left: edgeRadius,
      },
      bottomRight: {
        borderRightWidth: edgeBorderWidth,
        borderBottomWidth: edgeBorderWidth,
        borderBottomRightRadius: edgeRadius,
        bottom: edgeRadius,
        right: edgeRadius,
      },
      bottomLeft: {
        borderLeftWidth: edgeBorderWidth,
        borderBottomWidth: edgeBorderWidth,
        borderBottomLeftRadius: edgeRadius,
        bottom: edgeRadius,
        left: edgeRadius,
      },
    };
    return <View style={[defaultStyle, styles[position + 'Edge'], edgeBorderStyle[position]]} />;
  };

  const renderScanComp = () => {
    return (
      <View style={styles.main}>
        <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={[styles.container]}>
          <View style={styles.layerTop}></View>
          <View style={styles.layerCenter}>
            <View style={styles.layerLeft} />
            <View style={styles.focused} onLayout={onLineLayout}>
              <EdgeQRCode position="topRight" />
              <EdgeQRCode position="topLeft" />
              <Animated.View
                style={[
                  {
                    transform: [{ translateY: transformLine }],
                  },
                  styles.lineAnim,
                ]}
              />
              <EdgeQRCode position="bottomRight" />
              <EdgeQRCode position="bottomLeft" />
            </View>
            <View style={styles.layerRight} />
          </View>
          <View style={styles.layerBottom} />
        </BarCodeScanner>
      </View>
    )
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.background}}>
      {
        (screen === 'scan' && renderScanComp()) ||
        (screen === 'data' && <QRData token={token}/>)
      }

      {/* Actions */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.close}>
        <View style={{ backgroundColor: 'rgba(0,0,0,.6)', width: 22, height: 22, alignItems: 'center', justifyContent: 'center', borderRadius: 13 }}>
          <Ionicons name="ios-close" size={20} color="#fff" />
        </View>
      </TouchableOpacity>

      <View style={styles.bottomAction}>
        <TouchableOpacity onPress={() => {
          setScreen('scan')
          setScanned(false)
        }}>
          <View style={styles.bottomButtonAction}>
            <MaterialIcons name="qr-code-scanner" size={20} color={COLORS.white} />
            <Text style={styles.bottomTextAction}>Quét mã</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {scanned && setScreen('data')}}>
          <View style={styles.bottomButtonAction}>
            <Feather name="package" size={20} color={COLORS.white} />
            <Text style={styles.bottomTextAction}>Dữ liệu</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Scanner

const opacity = 'rgba(0, 0, 0, 0.3)';
const styles = StyleSheet.create({
  close: {
    position: 'absolute',
    top: Constants.statusBarHeight + 20,
    right: 10,
    width: 40,
    height: 40
  },
  bottomAction: {
    backgroundColor: opacity,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 90,
    position: 'absolute',
    width: SIZES.width,
    bottom: 0,
    left: 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  bottomButtonAction: {
    alignItems: 'center',
    width: SIZES.width / 2
  },
  bottomTextAction: {
    color: 'white',
    fontSize: 13,
    lineHeight: 22,
    fontFamily: 'medium',
    marginTop: 4
  },
  main: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    width: SIZES.height,
    height: SIZES.height / 2,
  },
  layerTop: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  layerCenter: {
    flex: 1,
    flexDirection: 'row',
  },
  layerLeft: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  focused: {
    flex: 1,
    position: 'relative',
    borderWidth: 0.5,
    borderColor: '#fff',
    borderRadius: 4,
  },
  layerRight: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  layerBottom: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // edge
  topLeftEdge: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  topRightEdge: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  bottomLeftEdge: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  bottomRightEdge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  lineAnim: {
    height: 2,
    backgroundColor: '#fff'
  },
  
})