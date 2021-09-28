#import <UIKit/UIKit.h>
#import <React/RCTView.h>

@interface BlurOverlay : RCTView

@property (nonatomic, strong) NSString *blurStyle;
@property (nonatomic) BOOL vibrant;

@end
