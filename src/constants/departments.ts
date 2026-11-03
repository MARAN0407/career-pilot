// Re-export exact 14 departments and subject utilities for backward compatibility
export { 
  DEPARTMENT_SUBJECTS as DEPARTMENTS,
  EXACT_14_DEPARTMENTS as DEPARTMENT_NAMES,
  getSubjectsForDepartment,
  findDepartmentData as getDepartmentByName
} from './departmentSubjects';
