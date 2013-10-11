$(function()
{
	var activeColorIndex = 0;

	function UpdateSpriteText(colors, pixelIndices)
	{
		spriteStr = "";
		for (var c = 0; c < 4; c++)
		{
			spriteStr += colors['c'+c] + " ";
		}
		spriteStr += "<br/>";

		for (var r = 0; r < 5; r++)
		{
			for (var c = 0; c < 5; c++)
			{
				var pIndex = r * 5 + c;
				var val = pixelIndices['p'+pIndex];
				if (val < 0)
				{
					spriteStr += ".";
				}
				else
				{
					spriteStr += val;
				}
			}
			spriteStr += "<br/>";
		}

		$('#spriteText').html(spriteStr);
	}

	function UpdatePixels(colors, pixels, pixelIndices)
	{
		for (var r = 0; r < 5; r++)
		{
			for (var c = 0; c < 5; c++)
			{
				var pIndex = r * 5 + c;
				var colorIndex = pixelIndices['p'+pIndex];
				var pixel = $(pixels['p'+pIndex]);
				if (colorIndex < 0)
				{
					pixel.css('background-image', 'url("transparent.png")');
				}
				else
				{
					pixel.css('background-image', 'none');
					pixel.css('background-color', colors['c'+colorIndex]);
				}
			}
		}
	}

	//Color
	var colorInputs = new Array();
	var colors = new Array();
	var pixels = new Array();
	var pixelIndices = new Array();
	var spriteStr = "";

	for (var i = 0; i < 4; i++)
	{
		colorInputs[i] = $('#colorpicker'+i);
		colorInputs[i].refIndex = i;
		colors['c'+i] = $('#colorpicker'+i).val();
	}

	for (var i = 0; i < 4; i++)
	{
		$('#colorpicker'+i).on('change', function() 
		{
			colors[this.name] = this.value;
			UpdateSpriteText(colors, pixelIndices);
			UpdatePixels(colors, pixels, pixelIndices);

			var index = this.name.substr(1);
			$('input[name="cradio"]').checked = false;
			$('input[name="cradio"]').filter('[value='+index+']').prop('checked', true);
			activeColorIndex = index;
		});
	}

	for (var p = 0; p < 25; p++)
	{
		pixelIndices['p'+p] = -1;
		pixels['p'+p] = $('#p'+p);
		pixels['p'+p].click(function()
		{
			pixelIndices[this.id] = activeColorIndex;
			UpdateSpriteText(colors, pixelIndices);
			UpdatePixels(colors, pixels, pixelIndices);
		});
	}

	$('input:radio').change(function()
	{
		activeColorIndex = $('input[name="cradio"]:checked').val();
	});

	UpdateSpriteText(colors, pixelIndices);
});