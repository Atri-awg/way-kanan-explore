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

  final TextEditingController searchController =
      TextEditingController();

  @override
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
      filteredDestinations =
          allDestinations.where((destination) {
        return destination.name
            .toLowerCase()
            .contains(keyword.toLowerCase());
      }).toList();
    });
  }
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Destinations')),
      body: FutureBuilder<List<Destination>>(
        future: service.getDestinations(),
        builder: (context, snapshot) {
          print("STATE = ${snapshot.connectionState}");

          if (snapshot.hasData) {
            print("DATA = ${snapshot.data!.length}");
          }

          if (snapshot.hasError) {
            print("ERROR = ${snapshot.error}");
          }

          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }

          if (snapshot.hasError) {
            return Center(child: Text(snapshot.error.toString()));
          }

          final destinations = snapshot.data ?? [];
          print(destinations.first.name);
          print(destinations.first.toJson());

          return ListView.separated(
            padding: const EdgeInsets.symmetric(
              horizontal: 16.0,
              vertical: 12.0,
            ),
            itemCount: destinations.length,
            itemBuilder: (context, index) {
              final destination = destinations[index];

              return DestinationCard(
                destination: destination,
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (_) =>
                          DestinationDetailPage(destination: destination),
                    ),
                  );
                },
              );
            },
            separatorBuilder: (context, index) {
              return const SizedBox(height: 8);
            },
          );
        },
      ),
    );
  }
}
