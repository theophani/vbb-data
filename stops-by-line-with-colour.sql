SELECT
	vbb_stops.stop_name,
	vbb_stops.stop_lat,
	vbb_stops.stop_lon,
	routes_with_colours.route_short_name,
	routes_with_colours.Hex,
	routes_with_colours.Inverse

FROM vbb_trips
INNER JOIN (
	SELECT *
	FROM vbb_routes
	INNER JOIN vbb_linienfarben
		ON vbb_linienfarben.Linie = vbb_routes.route_short_name
	WHERE (vbb_routes.route_short_name LIKE "S%" OR vbb_routes.route_short_name LIKE "U%")
) as routes_with_colours
	ON routes_with_colours.route_id = vbb_trips.route_id
INNER JOIN vbb_stop_times
	ON vbb_stop_times.trip_id = vbb_trips.trip_id
INNER JOIN vbb_stops
	ON vbb_stop_times.stop_id = vbb_stops.stop_id
	
WHERE direction_id = 0

GROUP BY
	routes_with_colours.route_short_name,
	vbb_stops.stop_name
	
ORDER BY routes_with_colours.route_short_name

;
