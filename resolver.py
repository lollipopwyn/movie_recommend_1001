import json
import pandas as pd
import sys


item_fname = "data/movie_final.csv"


def random_items(count):
  movies_df=pd.read_csv(item_fname)
  movies_df = movies_df.fillna("") # 공백을 채워준다
  result_items = movies_df.sample(n=count).to_dict("records")
  return result_items


if __name__ == "__main__":
  command = sys.argv[1]  # Get the command (random or latest)
    # count = int(sys.argv[2])  # Get the count value passed as an argument
   
  if command == "random":
    count = int(sys.argv[2])
    print(json.dumps(random_items(count)))
  else:
    print("Error: Invalid command provided")
    sys.exit(1)
