import 'package:flutter/material.dart';
import 'views/common/landing_screen.dart';

class HomeTweakApp extends StatelessWidget {
  const HomeTweakApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'HomeTweak',
      home: const LandingPage(),
    );
  }
}
