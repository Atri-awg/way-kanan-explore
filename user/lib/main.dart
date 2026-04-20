import 'package:flutter/material.dart';
import 'package:user/features/home/screens/home_page.dart';

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
