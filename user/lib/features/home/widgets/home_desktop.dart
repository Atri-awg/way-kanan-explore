import 'package:flutter/material.dart';
import 'package:user/core/constants/app_assets.dart';
import 'package:user/core/constants/app_colors.dart';

class HomeDesktop extends StatelessWidget {
  const HomeDesktop({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.amber[200],
      appBar: AppBar(
        title: Image.asset(AppAssets.logo, height: 70),
        backgroundColor: AppColors.greyLight,
      ),
      body: Center(
        child: Text(
          "Desktop Home",
          style:TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}