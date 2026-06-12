import 'package:flutter/foundation.dart';
import 'dart:convert';
import '../models/destination_model.dart';

class DestinationService {
  // Simulasi penundaan jaringan agar terasa seperti pemanggilan API sungguhan
  static const Duration _simulatedLatency = Duration(milliseconds: 800);

  /// Mengambil daftar semua destinasi
  Future<List<Destination>> getDestinations() async {
    try {
      await Future.delayed(_simulatedLatency);
      
      // Parse JSON string ke List of dynamic
      final List<dynamic> jsonData = jsonDecode('assets/data/destinations.json');
      
      // Mapping ke List<Destination> menggunakan model yang sudah dibuat
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
      
      final List<dynamic> jsonData = jsonDecode('assets/data/destinations.json');
      
      // Mencari data yang cocok dengan ID
      final targetJson = jsonData.firstWhere(
        (element) => element['id'] == id,
        orElse: () => null,
      );

      if (targetJson == null) return null;

      return Destination.fromJson(targetJson);
    } catch (e) {
      debugPrint('Error fetching destination details: $e');
      throw Exception('Gagal mengambil detail destinasi');
    }
  }

}