import 'package:flutter/foundation.dart';
import 'dart:convert';
import '../models/destination_model.dart';
import 'package:flutter/services.dart';

class DestinationService {
  // Simulasi penundaan jaringan agar terasa seperti pemanggilan API sungguhan
  static const Duration _simulatedLatency = Duration(milliseconds: 800);

  /// Mengambil daftar semua destinasi
  Future<List<Destination>> getDestinations() async {
    try {
      await Future.delayed(_simulatedLatency);

      final String jsonString = await rootBundle.loadString(
        'assets/data/destinations.json',
      );

      final List<dynamic> jsonData = jsonDecode(jsonString);

      return jsonData.map((json) => Destination.fromJson(json)).toList();
    } catch (e) {
      debugPrint('Error fetching destinations: $e');
      throw Exception('Gagal mengambil data destinasi');
    }
  }

  /// Mengambil detail satu destinasi berdasarkan ID
  Future<Destination?> getDestinationById(String id) async {
    try {
      await Future.delayed(_simulatedLatency);

      final String jsonString = await rootBundle.loadString(
        'assets/data/destinations.json',
      );

      final List<dynamic> jsonData = jsonDecode(jsonString);

      final targetJson = jsonData.cast<Map<String, dynamic>>().firstWhere(
        (element) => element['id'] == id,
        orElse: () => {},
      );

      if (targetJson.isEmpty) return null;

      return Destination.fromJson(targetJson);
    } catch (e) {
      debugPrint('Error fetching destination details: $e');
      throw Exception('Gagal mengambil detail destinasi');
    }
  }
}
