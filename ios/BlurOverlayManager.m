#import "BlurOverlayManager.h"

@implementation BlurOverlayManager

RCT_EXPORT_MODULE();

- (UIView *)view
{
    return [[BlurOverlay alloc] init];
}

RCT_EXPORT_VIEW_PROPERTY(blurStyle, NSString);
RCT_EXPORT_VIEW_PROPERTY(vibrant, BOOL);

@end
