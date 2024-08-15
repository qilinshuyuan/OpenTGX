# Automatic Resolution Fitting Strategy in OpenTGX

With the development of society, there are increasingly more mobile phone resolutions on the market, making it difficult to standardize. It is almost impossible to adapt to every resolution.

OpenTGX provides an automatic resolution fitting component [ResolutionAutoFit](https://github.com/qilinshuyuan/OpenTGX/blob/main/tgx-core-cocos/assets/core_tgx/base/ResolutionAutoFit.ts), which adopts an expansion mechanism to ensure that your UI is never cropped at any resolution.

## Pain Points

For example, we have created an interface at a resolution of 1280 x 720 (16:9), which almost fills the screen.

The Cocos Creator offers two options, `Fixed Width` and `Fixed Height`, which can form four combinations.

- Auto: `Fixed Width = false`, `Fixed Height = false`
- Fixed Width: `Fixed Width = true`, `Fixed Height = false`
- Fixed Height: `Fixed Width = false`, `Fixed Height = true`
- Show All: `Fixed Width = true`, `Fixed Height = true`

If we use fixed width, on a phone with a resolution of 1440 x 720 (2:1), you will find that the top and bottom are cropped.

If we use fixed height, on an iPad with a resolution of 1024 x 768 (4:3), you will find that the left and right sides are cropped.

The other two features provided by the engine also do not meet the requirements. You can test them yourself.

## Solution Principle

The approach of `ResolutionAutoFit` is very simple. On machines wider than the design resolution, it uses fixed height, so that more content is displayed on the left and right sides. On taller machines, it uses fixed width, so that more content is displayed on the top and bottom.

In this way, there is no need to worry about the interface being cropped. Artists can confidently design interfaces close to the full screen, presenting more attractive content.

## Resolution Selection

The selection of the project's design resolution mainly has two indicators:

- Aspect Ratio
- Pixels

### Aspect Ratio

The choice of aspect ratio should be based on the most popular mainstream resolution at present. For example, from the early 4:3, to the 16:9 era of the iPhone 6/7/8, and now to 2:1 or even 2.+:1.

If you are doing a project now, it is recommended to choose 16:9 or 2:1 (just turn the vertical screen upside down).

Of course, if you are making an H5 game, due to the need to remove the top and bottom of the browser, 9:16 may be the best choice.

### Pixel Selection

After determining the aspect ratio, the pixel selection problem is faced. For example, taking 16:9 as an example, we can choose.

Resolution | Full Screen Memory | Memory Ratio

|:---|:---|:---|
| 1136 x 640 | 2.77 MB | 100%  
| 1280 x 720 | 3.51 MB | 126%
| 1920 x 1080 | 7.9 MB | 285%
| 2560 x 1440 | 14.06 MB | 500%

Here, it is recommended to choose 720p, which is 1280 x 720. If you really need a clearer one, you can also choose 1920 x 1080. If you want to take into account low-end models as much as possible, choosing 1136 x 640 is also possible.

From the memory ratio column, it can be seen that as the resolution increases, the memory cost increases several times. The corresponding resolution requires corresponding precision images to achieve the effect. Therefore, please choose carefully.

The selection of other aspect ratios is also the same, just confirm the pixel value of the shorter side, and you can calculate the longer side. For example, in the case of 2:1, we can choose:

- 1280 x 640
- 1440 x 720
- 2160 x 1080
- 2880 x 1440
