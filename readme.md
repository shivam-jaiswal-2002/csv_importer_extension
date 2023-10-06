Steps for applying the extensions:

1) Open the spreadsheet and go to extension > App script.
2) In the app script just after the file section click on plus sign to add new script , name that script as Code.gs and paste the code provided in the repository named as "Code.gs".
3) Again click on plus sign and select HTML file , make a new file with name columnSelection.html and paste the code provided in the repository named as "columnSelection.html"
4) Save the script and run the Code.gs file to see if any error comes else move on to the spreadsheet.
5) You will see a new menu is added names Import CSV data just beside help menu.
6) Be ready with the csv file you want to use for sample i used a csv file named SampleCSV.csv which is available in the repository.
7) I made a raw link to the csv file so that the link can be given to the spreadsheet.
8) The link is "https://raw.githubusercontent.com/shivam-jaiswal-2002/index_page/main/sampleCSV.csv" without double quote.
9) Go the import from csv option > click on import from url > paste the above link there > click Ok > A new dialog box will open asking for the column name you want to display and the row range.
10) Give the columnName , in this case i gave three column names out of all (PropertyName, OwnerName , Revenue ) and in the second field i gave the row range as (2-10) so that the these rows from the selected columns should be displayed.
11) Click on submit.
12) Finally, you will see the selected columns with given row range will be imported in the spreasheet.

Note: Remember that if you are using a different csv file , then try to upload that csv on github and use the raw link of that csv file and paste it in import from url option as import from device directly feature is currently not designed here.
However i provided the link which you can directly use : https://raw.githubusercontent.com/shivam-jaiswal-2002/index_page/main/sampleCSV.csv.
If using different csv then remember to use raw link only.
For making raw link when opened a csv file in github you can see a button named raw at top right of the code just to the left of download icon . Just tap on that you will get a raw link to the csv file.
