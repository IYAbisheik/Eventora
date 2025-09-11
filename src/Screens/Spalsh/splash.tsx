import React, { useContext, useEffect, useRef } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import Video from 'react-native-video';

const Splash: React.FC = () => {
  const videoRef = useRef<Video | null>(null);


  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={require('../../../Assets/videos/Splash_video.mp4')}
        style={styles.video}
        resizeMode="cover"
        muted={false}
        repeat={false}
        ignoreSilentSwitch="obey"
        playInBackground={false}
        playWhenInactive={false}
        controls={false}
        {...(Platform.OS === 'android' && {
            showNotificationControls: false,
            disableBack: true,
            disableVolume: true,
            disableFullscreen: true,
            hideShutterView: true,
            controlsBlocker: true,
            videoControlBlocker: true,
            controls: false,
            controlsStyles: {
              hideSeekBar: true,
              hideDuration: true,
              hidePosition: true,
              hidePlayPause: true,
              hideForward: true,
              hideRewind: true,
              hideNext: true,
              hidePrevious: true,
              hideFullscreen: true,
              hideNavigationBarOnFullScreenMode: true,
              hideNotificationBarOnFullScreenMode: true,
              hideSettingButton: true
            }
          })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  video: {
    width: '100%',
    height: '100%',
  },
});

export default React.memo(Splash);
