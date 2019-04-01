# Note: there is a duplicate line in the source data for RB51.
# This will cause an issue when specifying that Linie is the primary key.
# The BVG uses the first one, Erikaviolett, so that is the one I kept.

# Some routes use black text, instead of white,
# so I added the column `Inverse` that I intend to use to indicate this.

# Also, something is up with the encoding in the source file,
# but it only effects the human-readable colour name

CREATE TABLE vbb_linienfarben (
	Linie          VARCHAR(5) NOT NULL,
	Farbentitel    VARCHAR(30) NULL,
	RAL            VARCHAR(10) NULL,
	C              SMALLINT NULL,
	M              SMALLINT NULL,
	Y              SMALLINT NULL,
	K              SMALLINT NULL,
	R              SMALLINT NULL,
	G              SMALLINT NULL,
	B              SMALLINT NULL,
	Hex            VARCHAR(7) NULL,
	Inverse        BOOLEAN NOT NULL default 0,
	PRIMARY KEY    (Linie)
);

CREATE TABLE vbb_stops (
	stop_id              VARCHAR(20) NOT NULL,
#	stop_code
	stop_name            VARCHAR(100) NULL,
#	stop_desc
	stop_lat             DECIMAL(9,6) NULL,
	stop_lon             DECIMAL(9,6) NULL,
	location_type        BOOLEAN NULL,
	parent_station       VARCHAR(20) NULL,
	wheelchair_boarding  BOOLEAN NULL default NULL,
	PRIMARY KEY          (stop_id)
);

CREATE TABLE vbb_routes (
	route_id            VARCHAR(10) NOT NULL,
	agency_id           SMALLINT NULL,
	route_short_name    VARCHAR(6) NULL,
	route_long_name     VARCHAR(100) NULL,
	route_type          SMALLINT NULL,
	route_color         VARCHAR(6) NULL,
	route_text_color    VARCHAR(6) NULL,
	route_desc          VARCHAR(100) NULL,
	PRIMARY KEY         (route_id)
);

CREATE TABLE vbb_trips (
	route_id                 VARCHAR(10) NOT NULL,
	service_id               VARCHAR(10) NOT NULL,
	trip_id                  VARCHAR(10) NOT NULL,
	trip_headsign            VARCHAR(100) NOT NULL,
#	trip_short_name
	direction_id             BOOLEAN NULL default NULL,
#	block_id
	shape_id                 VARCHAR(100) NOT NULL,
	wheelchair_accessible    BOOLEAN NULL default NULL,
	bikes_allowed            BOOLEAN NULL default NULL,
	PRIMARY KEY              (trip_id)
);

CREATE TABLE vbb_stop_times (
	trip_id                  VARCHAR(10) NOT NULL,
	arrival_time             TIME NULL,
	departure_time           TIME NULL,
	stop_id                  VARCHAR(20) NOT NULL,
	stop_sequence            SMALLINT NULL,
	#pickup_type
	#drop_off_type
	#stop_headsign
	KEY `index_on_trip_id`   (`trip_id`),
	KEY `index_on_stop_id`   (`stop_id`)
);
