
## To log scraper output:

1. Run scraper through scraper_logging.sh using the following command: 

```bash scraper_logging.sh -n scraper_name -c "command normally used for running scraper"``` 

Use the -n flag to indicate scraper name and -c flag to indicate scraper command.

Example : ```bash scraper_logging.sh -n air_alliance_autogc -c "pipenv run python autogc_scraper.py"```
