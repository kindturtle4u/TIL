# README

## 참고
- 하단탭: https://reactnavigation.org/docs/bottom-tab-navigator
- 하단탭: https://devbksheen.tistory.com/entry/%ED%95%98%EB%8B%A8-%ED%83%AD-%EB%82%B4%EB%B9%84%EA%B2%8C%EC%9D%B4%ED%84%B0Bottom-Tab-Navigator-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0#%ED%--%--%EB%-B%A-%--%ED%--%AD%--%EB%--%B-%EB%B-%--%EA%B-%-C%EC%-D%B-%ED%--%B--Bottom%--Tab%--Navigator-%C-%A-%EC%--%A-%EC%A-%--%--%EB%B-%-F%--%EC%--%AC%EC%-A%A-%EB%B-%--
- 폰트 사이즈: https://muhammadrafeh.medium.com/make-responsive-react-native-text-for-any-device-f8301b006694
- 아이콘: https://icons.expo.fyi/Index
- WebView: https://github.com/react-native-webview/react-native-webview/blob/master/docs/Guide.md#react-native-webview-guide
- 네트워크 연결: https://github.com/react-native-netinfo/react-native-netinfo?tab=readme-ov-file#netinfostatetype


## TODO
- 백버튼 처리
- toast 메시지
- 상태관리
- axios: https://axios-http.com/kr/docs/config_defaults
- 전송 암호화? 보안?
- 웹뷰<-> native js 통신
- React Navigation
- React Native Elements (UI 라이브러리)
- 개발환경 나누기 (개발, 운영테스트, 운영)
- apk , aab, ipa 빌드
- zustand? : https://zustand-demo.pmnd.rs/
  * react native에서도 잘 잘동한다고함.
- react-form-hook : https://react-hook-form.com/
  * 호환성 및 성능 문제가 발생할 수 있음. 고려해보고 사용
- react-use : https://streamich.github.io/react-use/?path=/story/components-usekey--demo
  * 웹에 특화된 기능은 호환성 문제가 있을수 있음... 안쓰는게 좋을듯..? 필요한건 hook으로 직접 구성해서 사용하면될듯
- 자동로그인 
- JWT???

## Expo Secure Store VS AsyncStorage
- Expo Secure Store와 AsyncStorage는 모두 모바일 애플리케이션에 데이터를 저장하는 도구입니다.
- Expo Secure Store는 암호화를 사용하여 데이터를 저장하는 도구이며 사용자 이름, 비밀번호, API 키 등과 같은 민감한 정보를 저장하는 데 사용할 수 있습니다. 
- Expo Secure Store의 기본 계층은 iOS의 키체인과 Android의 공유 기본 설정을 사용하여 암호화된 저장소를 구현하므로 데이터가 장치에 저장될 때 매우 안전합니다.
- AsyncStorage는 모바일 애플리케이션에 데이터를 저장하는 도구이며 중요하지 않은 정보를 저장하는 데 사용할 수 있습니다. 
- AsyncStorage는 로컬 저장소 기술(예: iOS의 NSUserDefaults 및 Android의 Shared Preferences)을 사용하여 데이터 저장소를 구현하므로 데이터가 장치에 저장될 때 특별히 안전하지 않습니다.
- 일반적으로 사용자 이름, 비밀번호, API 키 등과 같은 민감한 정보를 저장해야 하는 경우 Expo Secure Store를 사용하는 것이 좋습니다. 
- 사용자 기본 설정과 같이 민감하지 않은 정보를 저장해야 하는 경우 AsyncStorage를 사용할 수 있습니다.
