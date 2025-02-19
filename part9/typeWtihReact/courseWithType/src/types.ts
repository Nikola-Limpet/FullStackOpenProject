export interface CoursePartbase {
  name: string;
  exerciseCount: number;
  kind: string
}

interface CoursePartWithDiscription extends CoursePartbase {
  description: string;
}

export interface CouresPartBasic extends CoursePartWithDiscription {
  kind: 'basic'
}

export interface CoursePartBackground extends CoursePartWithDiscription {
  kind: "background";
  backgroundMaterial: string;
}
export interface CoursePartGroup extends CoursePartbase {
  groupProjectCount: number;
  kind: "group"
}
export interface CoursePartSpecial extends CoursePartWithDiscription {
  kind: "special",
  requirements: string[];
}

export type CoursePart = CouresPartBasic | CoursePartBackground | CoursePartGroup | CoursePartSpecial;
