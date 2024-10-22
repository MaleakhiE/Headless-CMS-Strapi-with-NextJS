import type { Struct, Schema } from '@strapi/strapi';

export interface StructureLayout extends Struct.ComponentSchema {
  collectionName: 'components_structure_layouts';
  info: {
    displayName: 'Layout';
    description: '';
  };
  attributes: {
    menu: Schema.Attribute.String;
    Position: Schema.Attribute.Integer &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMax<
        {
          max: 7;
        },
        number
      >;
  };
}

export interface ProjectsComponents extends Struct.ComponentSchema {
  collectionName: 'components_projects_components';
  info: {
    displayName: 'Components';
    description: '';
  };
  attributes: {
    title: Schema.Attribute.String;
    description: Schema.Attribute.RichText;
    link: Schema.Attribute.String;
    isExternal: Schema.Attribute.Boolean;
    imageURL: Schema.Attribute.Media<'images'>;
  };
}

export interface PhotoComponents extends Struct.ComponentSchema {
  collectionName: 'components_photo_components';
  info: {
    displayName: 'Components';
  };
  attributes: {
    imageUrl: Schema.Attribute.Media<'images'>;
  };
}

export interface NavbarComponents extends Struct.ComponentSchema {
  collectionName: 'components_navbar_components';
  info: {
    displayName: 'Components';
  };
  attributes: {
    logoWeb: Schema.Attribute.Media<'images'>;
  };
}

export interface NavbarButton extends Struct.ComponentSchema {
  collectionName: 'components_navbar_buttons';
  info: {
    displayName: 'Button';
  };
  attributes: {
    logoLink: Schema.Attribute.String;
    title: Schema.Attribute.String;
    isExternal: Schema.Attribute.Boolean;
  };
}

export interface ExperienceComponents extends Struct.ComponentSchema {
  collectionName: 'components_experience_components';
  info: {
    displayName: 'Components';
    description: '';
  };
  attributes: {
    title: Schema.Attribute.String;
    childTitle: Schema.Attribute.String;
    jobTitle: Schema.Attribute.String;
    jobDates: Schema.Attribute.String;
    description: Schema.Attribute.RichText;
    skillTitle: Schema.Attribute.Text;
  };
}

export interface BannerComponents extends Struct.ComponentSchema {
  collectionName: 'components_banner_components';
  info: {
    displayName: 'Components';
    description: '';
  };
  attributes: {
    title: Schema.Attribute.String;
    childTitle: Schema.Attribute.String;
    description: Schema.Attribute.RichText;
    buttonName: Schema.Attribute.String;
    link: Schema.Attribute.String;
    isExternal: Schema.Attribute.Boolean;
  };
}

export interface AboutComponents extends Struct.ComponentSchema {
  collectionName: 'components_about_components';
  info: {
    displayName: 'Components';
  };
  attributes: {
    title: Schema.Attribute.String;
    childTitle: Schema.Attribute.String;
    description: Schema.Attribute.RichText;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'structure.layout': StructureLayout;
      'projects.components': ProjectsComponents;
      'photo.components': PhotoComponents;
      'navbar.components': NavbarComponents;
      'navbar.button': NavbarButton;
      'experience.components': ExperienceComponents;
      'banner.components': BannerComponents;
      'about.components': AboutComponents;
    }
  }
}
