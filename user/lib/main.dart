import 'package:flutter/material.dart';
import 'package:user/features/home/screens/home_page.dart';
import 'package:user/features/travel_list/travel_list_page.dart';
import 'package:user/features/destination/screens/destination_detail_page.dart';
import 'package:user/features/destination/screens/destination_list_page.dart';

import 'package:user/features/about/screens/about_way_kanan_page.dart';
import 'package:user/features/contact/screens/contact_page.dart';
import 'package:user/features/gallery/screens/gallery_page.dart';
import 'package:user/features/destination/screens/destination_list_page.dart';
import 'package:user/features/article/screens/article_page.dart';


void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: HomePage(),
      // theme: ThemeData(
      //   useMaterial3: true,
      //   colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),

      //   appBarTheme: const AppBarTheme(
      //     backgroundColor: Colors.deepPurple,
      //     foregroundColor: Colors.white,
      //     centerTitle: true,
      //   ),
      // ),
    );
  }
}
