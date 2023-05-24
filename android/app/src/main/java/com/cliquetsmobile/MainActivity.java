package com.cliquetsmobile;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;
import com.christopherdro.htmltopdf.RNHTMLtoPDFPackage;

// // Include Package
// new MainReactPackage(),
// new RNHTMLtoPDFPackage();

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "cliquetsmobile";
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. Here we use a util class {@link
   * DefaultReactActivityDelegate} which allows you to easily enable Fabric and Concurrent React
   * (aka React 18) with two boolean flags.
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new DefaultReactActivityDelegate(
        this,
        getMainComponentName(),
        // If you opted-in for the New Architecture, we enable the Fabric Renderer.
        DefaultNewArchitectureEntryPoint.getFabricEnabled(), // fabricEnabled
        // If you opted-in for the New Architecture, we enable Concurrent React (i.e. React 18).
        DefaultNewArchitectureEntryPoint.getConcurrentReactEnabled() // concurrentRootEnabled
        );
  }
  // Just added this to test new packages - Remove this if you have errors compiling or executing - G.T - It failed spectacularly
  // @Override
  // protected List<ReactPackage> getPackages() {
  //   /UnnecessaryLocalVariable/
  //   List<ReactPackage> packages = new PackageList().getPackages();
  //   packages.add(new MainReactPackage());
  //   packages.add(new RNHTMLtoPDFPackage();)

  //   return packages;
  // }
}
