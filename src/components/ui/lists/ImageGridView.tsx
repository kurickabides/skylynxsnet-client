import React from "react";
import {
  GalleryCard,
  GalleryCardContent,
  GalleryImage,
  GalleryLabel,
  GalleryDescription,
  GalleryContainer,
} from "../styled/galleryParts"; 
import {
  FlexRowBetween,
  PaperContainer,
  FlexCenterRow,
} from "../../../theme/appStyles";
import {
  GalleryItem,
  GalleryListViewProps,
} from "../../../modules/galleryListView/types";

const ImageGridView: React.FC<GalleryListViewProps> = ({
  items,
  itemsPerPage = 6,
  onItemClick,
  settings,
}) => {
  return (
    <>
      <GalleryContainer>
        {items.map((item) => (
          <GalleryCard
            key={item.id}
            onClick={() => onItemClick(item.id)}
            title={`${item.description || ""}`}
          >
            <GalleryLabel>{item.label}</GalleryLabel>
            <GalleryImage
              src={`backgrounds/${item.splashImage}`}
              alt={item.label}
            />
            <GalleryCardContent>
              {settings.showDescription && item.description && (
                <GalleryDescription>{item.description}</GalleryDescription>
              )}
            </GalleryCardContent>
          </GalleryCard>
        ))}
      </GalleryContainer>
    </>
  );
};

export default ImageGridView;
