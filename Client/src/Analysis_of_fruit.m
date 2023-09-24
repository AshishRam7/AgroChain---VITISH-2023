%Using rotten apple as sample******

% Read the input fruit image
Apple = imread('rotten apple.jpg');

% Convert the image to grayscale
grayImage = rgb2gray(Apple);
%Performing histogram equalization to balance out the intensity across pixels
Apple=histeq(grayImage);
% Spatial filtering using median filter of 10X10 grid
filteredRGBImage=medfilt2(Apple,[10 10]);
Apple=imsharpen(filteredRGBImage,'Amount',1.5);


%Canny edge detection
Canny = edge(Apple,'canny');
[numRows, numCols] = size(Canny);



for row = 1:numRows
    for col = 1:numCols
        if(Canny(row,col) == 1)
            element = 254;
        else
            element = 0;
        end

        Cannyedge(row, col) = element;
    end
end
%figure(2)
%imshow(Cannyedge)
im2gray(Cannyedge)
% Apply a threshold to segment the image into regions
otsu_level=graythresh(Apple);
binaryImage = grayImage < (otsu_level*255);
%Contour the image to get the outline
mask=zeros(size(grayImage))
mask(10:end-10,10:end-10)=1
contour=activecontour(grayImage,mask,300)
figure(1)
finalimage=contour-binaryImage;
imshow(finalimage);
%figure(3)
%imshow(contour)
% Perform morphological operations to clean up the binary image
binaryImage = imopen(binaryImage, strel('disk', 5));
binaryImage= imclose(binaryImage, strel('disk', 15));

% Label connected components in the binary image
[labeldImage, numComponents] = bwlabel(binaryImage);

% Calculate the area of each connected component
componentAreas = regionprops(binaryImage, 'Area');

% Define a threshold for considering a region as rotten
for i = 1:numComponents
    M=max(componentAreas(i).Area);
end
rottenThreshold = M;
% You may need to adjust this value

% Initialize a counter for rotten fruit
rottenCount = 0;
sum=0;
% Loop through the connected components and identify rotten fruit

for i = 1:numComponents
    if componentAreas(i).Area > rottenThreshold
        % This region is considered as rotten fruit
        rottenCount = rottenCount + 1;
        sum=sum+componentAreas(i).Area;
    end
end
% Calculate the percentage of rotten area
totalPixels = numel(binaryImage);
percentageRotten = (sum/ totalPixels) * 100;
% Display the original image with detected rotten fruit
%figure(2)
%imshow("rotten apple.jpg");
fprintf('Percentage of rotten area: %.2f%%\n', percentageRotten);
title(['Detected Rotten Areas: ' num2str(rottenCount)] );

%Collect the values in a variable
Rotten_areas=num2str(rottenCount);
Percentage=num2str(percentageRotten);
% Convert the MATLAB structure data into a JSON string
json = jsonencode(data);

    % Open the JSON file for writing
    fid = fopen('D:\python projects\SIH-project-local\Client\src\matlabData.json', 'w');
    if fid == -1
        error('Unable to open the JSON file for writing.');
    end
    
    % Write the JSON data to the file
    fwrite(fid, json, 'char');
    pause(5);
    
    % Close the file
fclose(fid);