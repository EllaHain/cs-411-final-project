<h1>How to Run:</h1>
Video Link: https://drive.google.com/file/d/13BWYGNe9ShVDmPKRlIDXPyWzhZQ9A5My/view?usp=sharing<br>
1) cd into client folder<br>
2) run npm run dev to open application on local host<br>
3) input name and pass and hit login- should take you to the home page


# CS411 Project
<h1> Project Description: </h1>
<p1>We will combine the weather API and the Spotify API in order to make an application that allows the user to receive a playlist from Spotify to match the weather. 
  We expect to use the weather API, and the Spotify API. 
  We will use the database to store user account information.
  We intend to use React.js and Flask, but that may change.
</p1>

<h1>Project Requirements:</h1>
<p1>
<ul>
  <li><b>Goal:</b> Develop a responsive web application that allows users to receive Spotify playlist recommendations based on real-time weather conditions.
  </li>
  <li><b>Non-Goal:</b> : Automatically update playlists in real-time as weather changes without user intervention. </li>
  <li><b>Non-Functional Requirement 1: Usability</b>
  <ul> 
    <li> Employ an intuitive UI/UX design that facilitates an easy-to-understand and straightforward navigation path for all functionalities</li>
    <li>Ensure the application adapts seamlessly to different screen sizes and resolutions, including desktops, tablets, and phones, providing a consistent and optimized user experience across all devices</li>
  </ul></li>
  <li><b>Non-Functional Requirement 2: Fault tolerace</b>
    <ul> 
    <li>Minimize crashes and errors caused from large amounts of matching playlists
</li>
    <li>Ensure the application still responds quickly and accurately when requesting a lot of different playlists from spotify</li>
  </ul></li>
</ul></p1>

<h1>Project Management:</h1>
<ul>
<li><b>Theme:</b> Create a sense of enjoyment and preparation for the day through connecting outside weather forces to music.</li>
<li><b>Epic:</b> Weather based playlists recommendations</li>
<li><b>User Story 1:</b> As a user, I want to ensure that my Spotify account will not lose any of my own data when merging with another website.
<ul>
<li><b>Task:</b> Eliminate data migration while combining different APIs
<ul>
<li><b>Ticket 1:</b> Selectively share and migrate essential data necessary for the merged functionality avoiding transference of information that is not directly relevant to the user experience on the other website.</li>
<li><b>Ticket 2:</b> Initialize a data backup before the merge to serve as a safety net in case anything goes wrong during the migration process, reducing the risk of data loss.</li>
</ul>
</li>
</ul>
</li>
<li><b>User Story 2:</b> As a person who likes variety, I want to be able to have a lot of options from the playlists generated by the weather.
<ul>
<li><b>Task:</b> Ensure a large amount of data can be processed smoothly
<ul>
<li><b>Ticket 1:</b> Use a DB that has capacity to store large amounts of data in an efficient way</li>
<li><b>Ticket 2:</b> Create some kind of filtering system that keeps out playlists that would not fit the correct category to ensure no unnecessary data gets through</li>
</ul>
</li></ul>
</li>
