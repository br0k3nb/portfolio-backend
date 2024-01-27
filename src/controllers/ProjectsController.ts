import { Request, Response } from 'express';
import Projects from '../models/ Projects';

export default {
    async view(req: Request, res: Response) {
        try {
            const { search, limit, page } = req.query
            
            const searchRegex = new RegExp(search as string, 'i');

            if(!(search as string).length) {
                const aggregate = Projects.aggregate(
                    [
                        {
                            $match: {}
                        },
                        {
                            $sort: { createdAt: 1 }
                        }
                    ]
                );
                
                const projects = await Projects.aggregatePaginate(aggregate, { 
                    page: Number(page), limit: Number(limit) 
                });

                return res.status(200).json({ projects });
            };

            if((search as string).length > 0) {
                const aggregate = Projects.aggregate(
                    [
                        {
                            $match: { 
                                $and: [
                                    { 
                                        $or: [
                                            { 'generalInfo.name': searchRegex },
                                            { 'generalInfo.description': searchRegex },
                                            { 'stackInfo.stack': searchRegex },
                                        ] 
                                    },
                                ]
                            }
                        }, 
                        {
                            $sort: { createdAt: 1 }
                        }
                    ]
                    
                );

                const projects = await Projects.aggregatePaginate(aggregate, { 
                    page: Number(page), limit: Number(limit)
                });

                return res.status(200).json({ projects });
            }
        } catch (err) {
            res.status(400).json({ message: err });
            console.log(err);
        }
    },
    async add(req: Request , res: Response) {
        try {
            if(process.env.NODE_ENV !== "development") {
                return res.status(400).json({ message: "Access denied!" });
            }

            const { name, description, image, stack, stackIcons, githubLink, projectLink } = req.body;

            await Projects.create({
                image,
                generalInfo: {
                    name,
                    description,
                    githubLink, 
                    projectLink
                },
                stackInfo: {
                    stack,
                    icons: stackIcons
                },
            });
            
            res.status(200).json({ message: 'Project created!' });
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: 'Error creating a new note, please try again or later' });
        }
    },
    async edit(req: Request , res: Response) {
        try {
            if(process.env.NODE_ENV !== "development") {
                return res.status(400).json({ message: "Access denied!" });
            }

            const { _id, name, description, image, stack, stackIcons, githubLink, projectLink } = req.body;

            await Projects.findOneAndUpdate({ _id }, {
                image,
                generalInfo: {
                    name,
                    description,
                    githubLink,
                    projectLink
                },
                stackInfo: {
                    stack,
                    icons: stackIcons
                },
            });
            
            res.status(200).json({ message: 'Project updated!' });
        } catch (err) {
            res.status(400).json({ message: 'Error, please try again later!' });
        }
    },
    async delete(req: Request , res: Response) {
        try {
            if(process.env.NODE_ENV !== "development") {
                return res.status(400).json({ message: "Access denied!" });
            }

            const { id } = req.params;
            await Projects.findByIdAndDelete(id);
            
            res.status(200).json({ message: 'Project deleted!' });
        } catch (err) {
            res.status(400).json({ message: 'Error, please try again later!' });
        }
    }
}