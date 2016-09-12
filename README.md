Material DatePicker
====================

### 1. epepite Material Design Lite


Use **material-datepicker.min.js**


```html
<script type="text/javascript" src="node_modules/moment/min/moment.min.js"></script>
<script type="text/javascript" src="node_modules/epepite-datepicker/dist/material-datepicker.min.js"></script>  
```

Just add **mdl-datepicker__input** class from your node


```html
<input class="mdl-datepicker__input" type="text" id="date-input" value="" />

```

-----

### 2. Use without Material Design Lite


Use **datepicker.min.js**


```html
<script type="text/javascript" src="node_modules/moment/min/moment.min.js"></script>
<script type="text/javascript" src="node_modules/epepite-datepicker/dist/datepicker.min.js"></script>  
```

Create **DatePicker** instance


```html
<script type="text/javascript"
  var datepicker = new epepite.DatePicker.DatePicker({
      'input' : '(string selector or HTMLElement)'
  });
</script>
```

### 3. Use independent Calendar

Calendar has no dependencies. You can use it without MDL or momentjs.

use **calendar.min.js**

```html
<script type="text/javascript" src="node_modules/epepite-datepicker/dist/calendar.min.js"></script> 
```

Create **Calendar** instance


```html
<div id="CalendarContainer"></div>

<script type="text/javascript"
    var calendar = new epepite.DatePicker.Calendar({
        'container' : document.querySelector('#CalendarContainer'),
        'min_date'  : new Date(),
        'max_date'  : new Date(2016, 11, 15)
    });

    calendar.on('date_update', function(event) {
        document.querySelector('.current-date').innerHTML = moment(event.detail.date).format('DD/MM/YYYY');
    });
        
</script>
```


## Options

**HTMlElement attributes**


| Name         | Type   | Default    | Description                                             |
|--------------|--------|------------|---------------------------------------------------------|
| data-pattern | string | DD/MM/YYYY | A [momentjs]([http://momentjs.com/) valid pattern       |
| data-min     | string | NULL       | Date min. Use [momentjs]([http://momentjs.com/) pattern |
| data-max     | string | NULL       | Date max.Use [momentjs]([http://momentjs.com/) pattern  |


--

**epepite.DatePicker.DatePicker**


| Name        | Type                  | Default    | Description                                       |
|-------------|-----------------------|------------|---------------------------------------------------|
| input       | string or HTMLElement | DD/MM/YYYY | A [momentjs]([http://momentjs.com/) valid pattern |
| min_date    | Date                  | NULL       | Date min                                          |
| max_date    | Date                  | NULL       | Date max                                          |
| format      | string                | DD/MM/YYYY | A [momentjs]([http://momentjs.com/) pattern       |

--

**epepite.DatePicker.Calendar**



| Name        | Type                  | Default    | Description                                       |
|-------------|-----------------------|------------|---------------------------------------------------|
| container   | string or HTMLElement | DD/MM/YYYY | A [momentjs]([http://momentjs.com/) valid pattern |
| min_date    | Date                  | NULL       | Date min                                          |
| max_date    | Date                  | NULL       | Date max                                          |

