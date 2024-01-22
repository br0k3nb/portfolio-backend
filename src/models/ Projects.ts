import mongoose from 'mongoose';
import ProjectsSchema from '../schemas/ProjectsSchema';

import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

ProjectsSchema.pre('findOneAndUpdate', function (next) {
    this.findOneAndUpdate({}, { updatedAt: new Date() });
    next();
});

ProjectsSchema.pre('save', function (next) {
    if (!this.isNew) this.updatedAt = new Date();
    next();
});

ProjectsSchema.plugin(mongooseAggregatePaginate);

const Projects = mongoose.model('Projects', ProjectsSchema, 'projects');

Projects.createIndexes();

export default Projects;