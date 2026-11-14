2. Why isn't LocalStorage enough?
Limitation	What it means for our Todo app
Browser-specific	Your phone doesn't automatically get your laptop's todos.
Device-specific	Data isn't shared across devices.
Limited storage	Typically around 5 MiB per origin, depending on browser.
JavaScript access	Anyone who can run JavaScript in your page can access its LocalStorage.
No database features	No SQL queries, relationships, or proper concurrent data management.
No built-in user accounts	You must build authentication and syncing separately.