# Front-end developer interview challenge

The purpose of this challenge is to build a small application that can pull data from the simple data service provided via a user action and plot the data on a graph and in and display the data in a data table.

You are provided the data service and a simple graph component.
Your job is to build in the ability to pull data from the data service via a user action, and then display the data in a data table built by you.

The data service provides three different datasets of different sizes.
Each dataset consists of two columns of data which each contain the column name and an array of numeric values.

ChallengeDataColumn:
Properties:
  name: string
  values: Array<number>

ChallengeDataSet:
  name: string
  xColumn: ChallengeDataColumn
  yColumn: ChallengeDataColumn

ChallengeDataService:
  getDataSet(): Promise<ChallengeDataSet>


# Conditions of acceptance:

Provide a way for the user to pull in any one of the three datasets (small, medium and large).

Provide UI to display the current displayed dataset.

Build a data table to display the given data sets.
The data table must have a header displaying the column name

We have provided a charting library for you to use for this example.  You'll only need to import this into your application and provide data to be graphed.
You won't need to modify this code.

You will not need to modify the ChallengeDataService code.

Feel free to use any approach, framework, or tools you need to meet the acceptance criteria.

TODO:
- style guidelines?
- layout requrements?
- streaming challenge?