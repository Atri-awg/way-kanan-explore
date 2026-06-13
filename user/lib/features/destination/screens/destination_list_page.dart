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

  String selectedCategory = "All";
  String searchKeyword = "";

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
    searchKeyword = keyword;
    applyFilters();
  }

  void filterCategory(String category) {
    selectedCategory = category;
    applyFilters();
  }

  void applyFilters() {
    setState(() {
      filteredDestinations = allDestinations.where((destination) {
        final matchSearch = destination.name.toLowerCase().contains(
          searchKeyword.toLowerCase(),
        );

        final matchCategory =
            selectedCategory == "All" ||
            destination.categories.any((c) => c.name == selectedCategory);

        return matchSearch && matchCategory;
      }).toList();
    });
  }

  Widget _buildCategoryChip(String category) {
    final isSelected = selectedCategory == category;

    return Padding(
      padding: const EdgeInsets.only(right: 8),
      child: FilterChip(
        selected: isSelected,
        label: Text(category),
        onSelected: (_) {
          filterCategory(category);
        },
      ),
    );
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

                Padding(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 16,
                  ), // Menyelaraskan jarak kiri-kanan dengan Search Bar
                  child: SizedBox(
                    height: 50,
                    child: ListView(
                      scrollDirection: Axis.horizontal,
                      children: [
                        _buildCategoryChip("All"),
                        _buildCategoryChip("Nature"),
                        _buildCategoryChip("Waterfall"),
                        _buildCategoryChip("Adventure"),
                      ],
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
