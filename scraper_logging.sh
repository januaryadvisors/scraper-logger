while getopts "n:c:" opt; do
  case $opt in
    n) SCRAPER_NAME=$OPTARG      ;;
    c) RUN_SCRAPER=$OPTARG   ;;
    *) echo 'error' >&2
       exit 1
  esac
done

START_TIME=$(date +"%Y-%m-%d %T")

# Send start time and scraper name to db and get id of new row.
ROW_ID=$(curl -H "Content-Type: application/json" -X POST -d '{"start_time": "'"$START_TIME"'", "name": "'"$SCRAPER_NAME"'"}' https://scraper-logger.herokuapp.com/start)

# Status will be the final line of stdout+stderr.  If the scraper completed,
# final line should be 'COMPLETE'. Else final line should be from stderr.
STATUS=$(COMMAND $RUN_SCRAPER 2>&1 | tail -1)

END_TIME=$(date +"%Y-%m-%d %T")

# Update row with end time and status.
curl -H "Content-Type: application/json" -X POST -d '{"end_time":"'"$END_TIME"'","status":"'"$STATUS"'","id":"'"$ROW_ID"'"}' https://scraper-logger.herokuapp.com/end
