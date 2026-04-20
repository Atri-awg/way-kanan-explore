import 'package:flutter/material.dart';
import 'package:user/core/constants/breakpoints.dart';

class ResponsiveLayout extends StatelessWidget {
  final Widget homeMobile;
  final Widget desktopBody;

  
  ResponsiveLayout({required this.homeMobile, required this.desktopBody});

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        if (constraints.maxWidth < AppBreakpoints.mobile) {
          return homeMobile;
        } else {
          return desktopBody;
        }
      },
    );
  }
}