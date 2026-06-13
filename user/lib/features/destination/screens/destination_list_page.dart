import 'package:flutter/material.dart';
import 'package:user/features/destination/models/destination_model.dart';
import 'package:user/features/destination/services/destination_service.dart';
import 'package:user/features/home/widgets/destination_card.dart';
import 'destination_detail_page.dart';

class DestinationListPage extends StatefulWidget {
  DestinationListPage({super.key});

  @override
  State<DestinationListPage> createState() => _DestinationListPageState();
}

class _DestinationListPageState extends State<DestinationListPage> {
  final DestinationService service = DestinationService();

  List<Destination> allDestinations = [];
  List<Destination> filteredDestinations = [];

  bool isLoading = true;

  final TextEditingController searchController = TextEditingController();

  @override
  void dispose() {
    searchController.dispose();
    super.dispose();
  }

  void initState() {
    super.initState();
    loadDestinations();
  }

  Future<void> loadDestinations() async {
    final data = await service.getDestinations();

    setState(() {
      allDestinations = data;
      filteredDestinations = data;
      isLoading = false;
    });
  }

  void searchDestination(String keyword) {
    setState(() {
      filteredDestinations = allDestinations.where((destination) {
        return destination.name.toLowerCase().contains(keyword.toLowerCase());
      }).toList();
    });
  }

  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Destinations')),
      body: isLoading
          ? const Center(child: CircularProgressIndicator())
          : Column(
              children: [
                // Search Bar
                Padding(
                  padding: const EdgeInsets.all(16),
                  child: TextField(
                    controller: searchController,
                    onChanged: searchDestination,
                    decoration: InputDecoration(
                      hintText: 'Cari destinasi...',
                      prefixIcon: const Icon(Icons.search),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                    ),
                  ),
                ),

                Expanded(
                  child: ListView.separated(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 16,
                      vertical: 8,
                    ),
                    itemCount: filteredDestinations.length,
                    itemBuilder: (context, index) {
                      final destination = filteredDestinations[index];

                      return DestinationCard(
                        destination: destination,
                        onTap: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (_) => DestinationDetailPage(
                                destination: destination,
                              ),
                            ),
                          );
                        },
                      );
                    },
                    separatorBuilder: (_, __) => const SizedBox(height: 12),
                  ),
                ),
              ],
            ),
    );
  }
}
