<!-- DO NOT EDIT README.md (It will be overridden by README.hbs) -->

# spinal-model-graph

The spinal graph is a data structure, using Spinalcom Model Definitions.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Description](#description)
- [Synopsis](#synopsis)
- [API](#api)
  - [Classes](#classes)
  - [Members](#members)
  - [Functions](#functions)
  - [SpinalContext ⇐ <code>SpinalNode&lt;T&gt;</code>](#spinalcontext-%E2%87%90-codespinalnodelttgtcode)
    - [new SpinalContext()](#new-spinalcontext)
    - [new SpinalContext([name], [type], [element])](#new-spinalcontextname-type-element)
    - [spinalContext.addChild(child, relationName, [relationType]) ⇒ <code>Promise.&lt;SpinalNode&gt;</code>](#spinalcontextaddchildchild-relationname-relationtype-%E2%87%92-codepromiseltspinalnodegtcode)
    - [spinalContext.addChildInContext(child, relationName, [relationType], context) ⇒ <code>Promise.&lt;SpinalNode&gt;</code>](#spinalcontextaddchildincontextchild-relationname-relationtype-context-%E2%87%92-codepromiseltspinalnodegtcode)
    - [spinalContext.getChildrenInContext([context]) ⇒ <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code>](#spinalcontextgetchildrenincontextcontext-%E2%87%92-codepromiseltarrayltspinalnodegtgtcode)
  - [SpinalContext](#spinalcontext)
    - [new SpinalContext()](#new-spinalcontext-1)
    - [new SpinalContext([name], [type], [element])](#new-spinalcontextname-type-element-1)
    - [spinalContext.addChild(child, relationName, [relationType]) ⇒ <code>Promise.&lt;SpinalNode&gt;</code>](#spinalcontextaddchildchild-relationname-relationtype-%E2%87%92-codepromiseltspinalnodegtcode-1)
    - [spinalContext.addChildInContext(child, relationName, [relationType], context) ⇒ <code>Promise.&lt;SpinalNode&gt;</code>](#spinalcontextaddchildincontextchild-relationname-relationtype-context-%E2%87%92-codepromiseltspinalnodegtcode-1)
    - [spinalContext.getChildrenInContext([context]) ⇒ <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code>](#spinalcontextgetchildrenincontextcontext-%E2%87%92-codepromiseltarrayltspinalnodegtgtcode-1)
  - [SpinalGraph ⇐ <code>SpinalNode</code>](#spinalgraph-%E2%87%90-codespinalnodecode)
    - [new SpinalGraph([name], [type], [element])](#new-spinalgraphname-type-element)
    - [spinalGraph.addContext(context) ⇒ <code>Promise.&lt;SpinalContext&gt;</code>](#spinalgraphaddcontextcontext-%E2%87%92-codepromiseltspinalcontextgtcode)
    - [spinalGraph.getContext(name) ⇒ <code>SpinalContext</code> \| <code>undefined</code>](#spinalgraphgetcontextname-%E2%87%92-codespinalcontextcode-%5C-codeundefinedcode)
    - [spinalGraph.getId() ⇒ <code>spinal.Str</code>](#spinalgraphgetid-%E2%87%92-codespinalstrcode)
    - [spinalGraph.getName() ⇒ <code>spinal.Str</code>](#spinalgraphgetname-%E2%87%92-codespinalstrcode)
    - [spinalGraph.getType() ⇒ <code>spinal.Str</code>](#spinalgraphgettype-%E2%87%92-codespinalstrcode)
    - [spinalGraph.getElement() ⇒ <code>Promise.&lt;T&gt;</code>](#spinalgraphgetelement-%E2%87%92-codepromiselttgtcode)
    - [spinalGraph.getChildrenIds() ⇒ <code>Array.&lt;string&gt;</code>](#spinalgraphgetchildrenids-%E2%87%92-codearrayltstringgtcode)
    - [spinalGraph.getNbChildren() ⇒ <code>number</code>](#spinalgraphgetnbchildren-%E2%87%92-codenumbercode)
    - [spinalGraph.addContextId(id)](#spinalgraphaddcontextidid)
    - [spinalGraph.getContextIds() ⇒ <code>Array.&lt;string&gt;</code>](#spinalgraphgetcontextids-%E2%87%92-codearrayltstringgtcode)
    - [spinalGraph.belongsToContext(context) ⇒ <code>boolean</code>](#spinalgraphbelongstocontextcontext-%E2%87%92-codebooleancode)
    - [spinalGraph.hasRelation(relationName, relationType) ⇒ <code>boolean</code>](#spinalgraphhasrelationrelationname-relationtype-%E2%87%92-codebooleancode)
    - [spinalGraph.hasRelations(relationNames, relationType) ⇒ <code>boolean</code>](#spinalgraphhasrelationsrelationnames-relationtype-%E2%87%92-codebooleancode)
    - [spinalGraph.getRelationNames() ⇒ <code>Array.&lt;string&gt;</code>](#spinalgraphgetrelationnames-%E2%87%92-codearrayltstringgtcode)
    - [spinalGraph.addChild(child, relationName, relationType) ⇒ <code>Promise.&lt;SpinalNode&gt;</code>](#spinalgraphaddchildchild-relationname-relationtype-%E2%87%92-codepromiseltspinalnodegtcode)
    - [spinalGraph.addChildInContext(child, relationName, relationType, context) ⇒ <code>Promise.&lt;SpinalNode&gt;</code>](#spinalgraphaddchildincontextchild-relationname-relationtype-context-%E2%87%92-codepromiseltspinalnodegtcode)
    - [spinalGraph.removeChild(node, relationName, relationType) ⇒ <code>Promise.&lt;void&gt;</code>](#spinalgraphremovechildnode-relationname-relationtype-%E2%87%92-codepromiseltvoidgtcode)
    - [spinalGraph.removeChildren(nodes, relationName, relationType) ⇒ <code>Promise.&lt;void&gt;</code>](#spinalgraphremovechildrennodes-relationname-relationtype-%E2%87%92-codepromiseltvoidgtcode)
    - [spinalGraph.removeRelation(relationName, relationType) ⇒ <code>Promise.&lt;void&gt;</code>](#spinalgraphremoverelationrelationname-relationtype-%E2%87%92-codepromiseltvoidgtcode)
    - [spinalGraph.removeFromGraph() ⇒ <code>Promise.&lt;void&gt;</code>](#spinalgraphremovefromgraph-%E2%87%92-codepromiseltvoidgtcode)
    - [spinalGraph.getChild(predicate, relationName, relationType) ⇒ <code>Promise.&lt;SpinalNode.&lt;any&gt;&gt;</code>](#spinalgraphgetchildpredicate-relationname-relationtype-%E2%87%92-codepromiseltspinalnodeltanygtgtcode)
    - [spinalGraph.getChildren([relationNames]) ⇒ <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code>](#spinalgraphgetchildrenrelationnames-%E2%87%92-codepromiseltarrayltspinalnodegtgtcode)
    - [spinalGraph.getChildrenInContext(context) ⇒ <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code>](#spinalgraphgetchildrenincontextcontext-%E2%87%92-codepromiseltarrayltspinalnodegtgtcode)
    - [spinalGraph.getParents([relationNames]) ⇒ <code>Promise.&lt;Array.&lt;SpinalNode.&lt;any&gt;&gt;&gt;</code>](#spinalgraphgetparentsrelationnames-%E2%87%92-codepromiseltarrayltspinalnodeltanygtgtgtcode)
    - [spinalGraph.find(relationNames, predicate) ⇒ <code>Promise.&lt;Array.&lt;SpinalNode.&lt;any&gt;&gt;&gt;</code>](#spinalgraphfindrelationnames-predicate-%E2%87%92-codepromiseltarrayltspinalnodeltanygtgtgtcode)
    - [spinalGraph.findInContext(context, predicate) ⇒ <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code>](#spinalgraphfindincontextcontext-predicate-%E2%87%92-codepromiseltarrayltspinalnodegtgtcode)
    - [spinalGraph.forEach(relationNames, callback)](#spinalgraphforeachrelationnames-callback)
    - [spinalGraph.forEachInContext(context, callback)](#spinalgraphforeachincontextcontext-callback)
    - [spinalGraph.map(relationNames, callback) ⇒ <code>Promise.&lt;Array.&lt;any&gt;&gt;</code>](#spinalgraphmaprelationnames-callback-%E2%87%92-codepromiseltarrayltanygtgtcode)
    - [spinalGraph.mapInContext(context, callback) ⇒ <code>Promise.&lt;Array.&lt;\*&gt;&gt;</code>](#spinalgraphmapincontextcontext-callback-%E2%87%92-codepromiseltarraylt%5Cgtgtcode)
    - [spinalGraph.\_getRelation(relationName, relationType) ⇒ <code>SpinalRelation</code>](#spinalgraph%5C_getrelationrelationname-relationtype-%E2%87%92-codespinalrelationcode)
    - [spinalGraph.\_removeParent(relation)](#spinalgraph%5C_removeparentrelation)
    - [spinalGraph.\_removeFromParents()](#spinalgraph%5C_removefromparents)
    - [spinalGraph.\_addParent(relation)](#spinalgraph%5C_addparentrelation)
    - [spinalGraph.\_createRelation(relationName, relationType)](#spinalgraph%5C_createrelationrelationname-relationtype)
    - [spinalGraph.\_removeFromChildren() ⇒ <code>Promise.&lt;void&gt;</code>](#spinalgraph%5C_removefromchildren-%E2%87%92-codepromiseltvoidgtcode)
  - [SpinalNode ⇐ <code>Model</code>](#spinalnode-%E2%87%90-codemodelcode)
    - [new SpinalNode([name], [type], [element])](#new-spinalnodename-type-element)
    - [spinalNode.getId() ⇒ <code>spinal.Str</code>](#spinalnodegetid-%E2%87%92-codespinalstrcode)
    - [spinalNode.getName() ⇒ <code>spinal.Str</code>](#spinalnodegetname-%E2%87%92-codespinalstrcode)
    - [spinalNode.getType() ⇒ <code>spinal.Str</code>](#spinalnodegettype-%E2%87%92-codespinalstrcode)
    - [spinalNode.getElement() ⇒ <code>Promise.&lt;T&gt;</code>](#spinalnodegetelement-%E2%87%92-codepromiselttgtcode)
    - [spinalNode.getChildrenIds() ⇒ <code>Array.&lt;string&gt;</code>](#spinalnodegetchildrenids-%E2%87%92-codearrayltstringgtcode)
    - [spinalNode.getNbChildren() ⇒ <code>number</code>](#spinalnodegetnbchildren-%E2%87%92-codenumbercode)
    - [spinalNode.addContextId(id)](#spinalnodeaddcontextidid)
    - [spinalNode.getContextIds() ⇒ <code>Array.&lt;string&gt;</code>](#spinalnodegetcontextids-%E2%87%92-codearrayltstringgtcode)
    - [spinalNode.belongsToContext(context) ⇒ <code>boolean</code>](#spinalnodebelongstocontextcontext-%E2%87%92-codebooleancode)
    - [spinalNode.hasRelation(relationName, relationType) ⇒ <code>boolean</code>](#spinalnodehasrelationrelationname-relationtype-%E2%87%92-codebooleancode)
    - [spinalNode.hasRelations(relationNames, relationType) ⇒ <code>boolean</code>](#spinalnodehasrelationsrelationnames-relationtype-%E2%87%92-codebooleancode)
    - [spinalNode.getRelationNames() ⇒ <code>Array.&lt;string&gt;</code>](#spinalnodegetrelationnames-%E2%87%92-codearrayltstringgtcode)
    - [spinalNode.addChild(child, relationName, relationType) ⇒ <code>Promise.&lt;SpinalNode&gt;</code>](#spinalnodeaddchildchild-relationname-relationtype-%E2%87%92-codepromiseltspinalnodegtcode)
    - [spinalNode.addChildInContext(child, relationName, relationType, context) ⇒ <code>Promise.&lt;SpinalNode&gt;</code>](#spinalnodeaddchildincontextchild-relationname-relationtype-context-%E2%87%92-codepromiseltspinalnodegtcode)
    - [spinalNode.removeChild(node, relationName, relationType) ⇒ <code>Promise.&lt;void&gt;</code>](#spinalnoderemovechildnode-relationname-relationtype-%E2%87%92-codepromiseltvoidgtcode)
    - [spinalNode.removeChildren(nodes, relationName, relationType) ⇒ <code>Promise.&lt;void&gt;</code>](#spinalnoderemovechildrennodes-relationname-relationtype-%E2%87%92-codepromiseltvoidgtcode)
    - [spinalNode.removeRelation(relationName, relationType) ⇒ <code>Promise.&lt;void&gt;</code>](#spinalnoderemoverelationrelationname-relationtype-%E2%87%92-codepromiseltvoidgtcode)
    - [spinalNode.removeFromGraph() ⇒ <code>Promise.&lt;void&gt;</code>](#spinalnoderemovefromgraph-%E2%87%92-codepromiseltvoidgtcode)
    - [spinalNode.getChild(predicate, relationName, relationType) ⇒ <code>Promise.&lt;SpinalNode.&lt;any&gt;&gt;</code>](#spinalnodegetchildpredicate-relationname-relationtype-%E2%87%92-codepromiseltspinalnodeltanygtgtcode)
    - [spinalNode.getChildren([relationNames]) ⇒ <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code>](#spinalnodegetchildrenrelationnames-%E2%87%92-codepromiseltarrayltspinalnodegtgtcode)
    - [spinalNode.getChildrenInContext(context) ⇒ <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code>](#spinalnodegetchildrenincontextcontext-%E2%87%92-codepromiseltarrayltspinalnodegtgtcode)
    - [spinalNode.getParents([relationNames]) ⇒ <code>Promise.&lt;Array.&lt;SpinalNode.&lt;any&gt;&gt;&gt;</code>](#spinalnodegetparentsrelationnames-%E2%87%92-codepromiseltarrayltspinalnodeltanygtgtgtcode)
    - [spinalNode.find(relationNames, predicate) ⇒ <code>Promise.&lt;Array.&lt;SpinalNode.&lt;any&gt;&gt;&gt;</code>](#spinalnodefindrelationnames-predicate-%E2%87%92-codepromiseltarrayltspinalnodeltanygtgtgtcode)
    - [spinalNode.findInContext(context, predicate) ⇒ <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code>](#spinalnodefindincontextcontext-predicate-%E2%87%92-codepromiseltarrayltspinalnodegtgtcode)
    - [spinalNode.forEach(relationNames, callback)](#spinalnodeforeachrelationnames-callback)
    - [spinalNode.forEachInContext(context, callback)](#spinalnodeforeachincontextcontext-callback)
    - [spinalNode.map(relationNames, callback) ⇒ <code>Promise.&lt;Array.&lt;any&gt;&gt;</code>](#spinalnodemaprelationnames-callback-%E2%87%92-codepromiseltarrayltanygtgtcode)
    - [spinalNode.mapInContext(context, callback) ⇒ <code>Promise.&lt;Array.&lt;\*&gt;&gt;</code>](#spinalnodemapincontextcontext-callback-%E2%87%92-codepromiseltarraylt%5Cgtgtcode)
    - [spinalNode.\_getRelation(relationName, relationType) ⇒ <code>SpinalRelation</code>](#spinalnode%5C_getrelationrelationname-relationtype-%E2%87%92-codespinalrelationcode)
    - [spinalNode.\_removeParent(relation)](#spinalnode%5C_removeparentrelation)
    - [spinalNode.\_removeFromParents()](#spinalnode%5C_removefromparents)
    - [spinalNode.\_addParent(relation)](#spinalnode%5C_addparentrelation)
    - [spinalNode.\_createRelation(relationName, relationType)](#spinalnode%5C_createrelationrelationname-relationtype)
    - [spinalNode.\_removeFromChildren() ⇒ <code>Promise.&lt;void&gt;</code>](#spinalnode%5C_removefromchildren-%E2%87%92-codepromiseltvoidgtcode)
  - [*BaseSpinalRelation ⇐ <code>Model</code>*](#basespinalrelation-%E2%87%90-codemodelcode)
    - [*new BaseSpinalRelation(parent, name)*](#new-basespinalrelationparent-name)
    - [*baseSpinalRelation.getId() ⇒ <code>spinal.Str</code>*](#basespinalrelationgetid-%E2%87%92-codespinalstrcode)
    - [*baseSpinalRelation.getName() ⇒ <code>spinal.Str</code>*](#basespinalrelationgetname-%E2%87%92-codespinalstrcode)
    - [*baseSpinalRelation.getParent() ⇒ <code>Promise.&lt;SpinalNode.&lt;spinal.Model&gt;&gt;</code>*](#basespinalrelationgetparent-%E2%87%92-codepromiseltspinalnodeltspinalmodelgtgtcode)
    - [*baseSpinalRelation.addContextId(id)*](#basespinalrelationaddcontextidid)
    - [*baseSpinalRelation.getContextIds() ⇒ <code>Array.&lt;string&gt;</code>*](#basespinalrelationgetcontextids-%E2%87%92-codearrayltstringgtcode)
    - [*baseSpinalRelation.belongsToContext(context) ⇒ <code>boolean</code>*](#basespinalrelationbelongstocontextcontext-%E2%87%92-codebooleancode)
    - [*baseSpinalRelation.removeChildren([nodesToDelete]) ⇒ <code>Promise.&lt;void&gt;</code>*](#basespinalrelationremovechildrennodestodelete-%E2%87%92-codepromiseltvoidgtcode)
    - [*baseSpinalRelation.removeFromGraph() ⇒ <code>Promise.&lt;void&gt;</code>*](#basespinalrelationremovefromgraph-%E2%87%92-codepromiseltvoidgtcode)
  - [SpinalRelationLstPtr ⇐ <code>BaseSpinalRelation</code>](#spinalrelationlstptr-%E2%87%90-codebasespinalrelationcode)
    - [new SpinalRelationLstPtr(parent, name)](#new-spinalrelationlstptrparent-name)
    - [spinalRelationLstPtr.getChildrenIds() ⇒ <code>Array.&lt;string&gt;</code>](#spinalrelationlstptrgetchildrenids-%E2%87%92-codearrayltstringgtcode)
    - [spinalRelationLstPtr.getNbChildren() ⇒ <code>number</code>](#spinalrelationlstptrgetnbchildren-%E2%87%92-codenumbercode)
    - [spinalRelationLstPtr.getChildren() ⇒ <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code>](#spinalrelationlstptrgetchildren-%E2%87%92-codepromiseltarrayltspinalnodegtgtcode)
    - [spinalRelationLstPtr.getChildrenInContext() ⇒ <code>Promise.&lt;Array.&lt;SpinalNodeAny&gt;&gt;</code>](#spinalrelationlstptrgetchildrenincontext-%E2%87%92-codepromiseltarrayltspinalnodeanygtgtcode)
    - [spinalRelationLstPtr.getType() ⇒ <code>string</code>](#spinalrelationlstptrgettype-%E2%87%92-codestringcode)
    - [spinalRelationLstPtr.addChild(node) ⇒ <code>Promise.&lt;SpinalNode.&lt;T&gt;&gt;</code>](#spinalrelationlstptraddchildnode-%E2%87%92-codepromiseltspinalnodelttgtgtcode)
    - [spinalRelationLstPtr.removeChild(node) ⇒ <code>Promise.&lt;void&gt;</code>](#spinalrelationlstptrremovechildnode-%E2%87%92-codepromiseltvoidgtcode)
    - [spinalRelationLstPtr.getId() ⇒ <code>spinal.Str</code>](#spinalrelationlstptrgetid-%E2%87%92-codespinalstrcode)
    - [spinalRelationLstPtr.getName() ⇒ <code>spinal.Str</code>](#spinalrelationlstptrgetname-%E2%87%92-codespinalstrcode)
    - [spinalRelationLstPtr.getParent() ⇒ <code>Promise.&lt;SpinalNode.&lt;spinal.Model&gt;&gt;</code>](#spinalrelationlstptrgetparent-%E2%87%92-codepromiseltspinalnodeltspinalmodelgtgtcode)
    - [spinalRelationLstPtr.addContextId(id)](#spinalrelationlstptraddcontextidid)
    - [spinalRelationLstPtr.getContextIds() ⇒ <code>Array.&lt;string&gt;</code>](#spinalrelationlstptrgetcontextids-%E2%87%92-codearrayltstringgtcode)
    - [spinalRelationLstPtr.belongsToContext(context) ⇒ <code>boolean</code>](#spinalrelationlstptrbelongstocontextcontext-%E2%87%92-codebooleancode)
    - [spinalRelationLstPtr.removeChildren([nodesToDelete]) ⇒ <code>Promise.&lt;void&gt;</code>](#spinalrelationlstptrremovechildrennodestodelete-%E2%87%92-codepromiseltvoidgtcode)
    - [spinalRelationLstPtr.removeFromGraph() ⇒ <code>Promise.&lt;void&gt;</code>](#spinalrelationlstptrremovefromgraph-%E2%87%92-codepromiseltvoidgtcode)
  - [SpinalRelationPtrLst ⇐ <code>BaseSpinalRelation</code>](#spinalrelationptrlst-%E2%87%90-codebasespinalrelationcode)
    - [new SpinalRelationPtrLst()](#new-spinalrelationptrlst)
    - [new SpinalRelationPtrLst(parent, name)](#new-spinalrelationptrlstparent-name)
    - [spinalRelationPtrLst.getChildrenIds() ⇒ <code>Array.&lt;String&gt;</code>](#spinalrelationptrlstgetchildrenids-%E2%87%92-codearrayltstringgtcode)
    - [spinalRelationPtrLst.getNbChildren() ⇒ <code>number</code>](#spinalrelationptrlstgetnbchildren-%E2%87%92-codenumbercode)
    - [spinalRelationPtrLst.getChildren() ⇒ <code>Promise.&lt;Array.&lt;SpinalNodeAny&gt;&gt;</code>](#spinalrelationptrlstgetchildren-%E2%87%92-codepromiseltarrayltspinalnodeanygtgtcode)
    - [spinalRelationPtrLst.getChildrenInContext(context) ⇒ <code>Promise.&lt;Array.&lt;SpinalNodeAny&gt;&gt;</code>](#spinalrelationptrlstgetchildrenincontextcontext-%E2%87%92-codepromiseltarrayltspinalnodeanygtgtcode)
    - [spinalRelationPtrLst.getType() ⇒ <code>string</code>](#spinalrelationptrlstgettype-%E2%87%92-codestringcode)
    - [spinalRelationPtrLst.addChild(node) ⇒ <code>Promise.&lt;SpinalNode.&lt;T&gt;&gt;</code>](#spinalrelationptrlstaddchildnode-%E2%87%92-codepromiseltspinalnodelttgtgtcode)
    - [spinalRelationPtrLst.removeChild(node) ⇒ <code>Promise.&lt;void&gt;</code>](#spinalrelationptrlstremovechildnode-%E2%87%92-codepromiseltvoidgtcode)
    - [spinalRelationPtrLst.getId() ⇒ <code>spinal.Str</code>](#spinalrelationptrlstgetid-%E2%87%92-codespinalstrcode)
    - [spinalRelationPtrLst.getName() ⇒ <code>spinal.Str</code>](#spinalrelationptrlstgetname-%E2%87%92-codespinalstrcode)
    - [spinalRelationPtrLst.getParent() ⇒ <code>Promise.&lt;SpinalNode.&lt;spinal.Model&gt;&gt;</code>](#spinalrelationptrlstgetparent-%E2%87%92-codepromiseltspinalnodeltspinalmodelgtgtcode)
    - [spinalRelationPtrLst.addContextId(id)](#spinalrelationptrlstaddcontextidid)
    - [spinalRelationPtrLst.getContextIds() ⇒ <code>Array.&lt;string&gt;</code>](#spinalrelationptrlstgetcontextids-%E2%87%92-codearrayltstringgtcode)
    - [spinalRelationPtrLst.belongsToContext(context) ⇒ <code>boolean</code>](#spinalrelationptrlstbelongstocontextcontext-%E2%87%92-codebooleancode)
    - [spinalRelationPtrLst.removeChildren([nodesToDelete]) ⇒ <code>Promise.&lt;void&gt;</code>](#spinalrelationptrlstremovechildrennodestodelete-%E2%87%92-codepromiseltvoidgtcode)
    - [spinalRelationPtrLst.removeFromGraph() ⇒ <code>Promise.&lt;void&gt;</code>](#spinalrelationptrlstremovefromgraph-%E2%87%92-codepromiseltvoidgtcode)
  - [SpinalRelationPtrLst](#spinalrelationptrlst)
    - [new SpinalRelationPtrLst()](#new-spinalrelationptrlst-1)
    - [new SpinalRelationPtrLst(parent, name)](#new-spinalrelationptrlstparent-name-1)
    - [spinalRelationPtrLst.getChildrenIds() ⇒ <code>Array.&lt;String&gt;</code>](#spinalrelationptrlstgetchildrenids-%E2%87%92-codearrayltstringgtcode-1)
    - [spinalRelationPtrLst.getNbChildren() ⇒ <code>number</code>](#spinalrelationptrlstgetnbchildren-%E2%87%92-codenumbercode-1)
    - [spinalRelationPtrLst.getChildren() ⇒ <code>Promise.&lt;Array.&lt;SpinalNodeAny&gt;&gt;</code>](#spinalrelationptrlstgetchildren-%E2%87%92-codepromiseltarrayltspinalnodeanygtgtcode-1)
    - [spinalRelationPtrLst.getChildrenInContext(context) ⇒ <code>Promise.&lt;Array.&lt;SpinalNodeAny&gt;&gt;</code>](#spinalrelationptrlstgetchildrenincontextcontext-%E2%87%92-codepromiseltarrayltspinalnodeanygtgtcode-1)
    - [spinalRelationPtrLst.getType() ⇒ <code>string</code>](#spinalrelationptrlstgettype-%E2%87%92-codestringcode-1)
    - [spinalRelationPtrLst.addChild(node) ⇒ <code>Promise.&lt;SpinalNode.&lt;T&gt;&gt;</code>](#spinalrelationptrlstaddchildnode-%E2%87%92-codepromiseltspinalnodelttgtgtcode-1)
    - [spinalRelationPtrLst.removeChild(node) ⇒ <code>Promise.&lt;void&gt;</code>](#spinalrelationptrlstremovechildnode-%E2%87%92-codepromiseltvoidgtcode-1)
    - [spinalRelationPtrLst.getId() ⇒ <code>spinal.Str</code>](#spinalrelationptrlstgetid-%E2%87%92-codespinalstrcode-1)
    - [spinalRelationPtrLst.getName() ⇒ <code>spinal.Str</code>](#spinalrelationptrlstgetname-%E2%87%92-codespinalstrcode-1)
    - [spinalRelationPtrLst.getParent() ⇒ <code>Promise.&lt;SpinalNode.&lt;spinal.Model&gt;&gt;</code>](#spinalrelationptrlstgetparent-%E2%87%92-codepromiseltspinalnodeltspinalmodelgtgtcode-1)
    - [spinalRelationPtrLst.addContextId(id)](#spinalrelationptrlstaddcontextidid-1)
    - [spinalRelationPtrLst.getContextIds() ⇒ <code>Array.&lt;string&gt;</code>](#spinalrelationptrlstgetcontextids-%E2%87%92-codearrayltstringgtcode-1)
    - [spinalRelationPtrLst.belongsToContext(context) ⇒ <code>boolean</code>](#spinalrelationptrlstbelongstocontextcontext-%E2%87%92-codebooleancode-1)
    - [spinalRelationPtrLst.removeChildren([nodesToDelete]) ⇒ <code>Promise.&lt;void&gt;</code>](#spinalrelationptrlstremovechildrennodestodelete-%E2%87%92-codepromiseltvoidgtcode-1)
    - [spinalRelationPtrLst.removeFromGraph() ⇒ <code>Promise.&lt;void&gt;</code>](#spinalrelationptrlstremovefromgraph-%E2%87%92-codepromiseltvoidgtcode-1)
  - [SpinalRelationRef ⇐ <code>BaseSpinalRelation</code>](#spinalrelationref-%E2%87%90-codebasespinalrelationcode)
    - [new SpinalRelationRef()](#new-spinalrelationref)
    - [spinalRelationRef.getChildrenIds() ⇒ <code>Array.&lt;String&gt;</code>](#spinalrelationrefgetchildrenids-%E2%87%92-codearrayltstringgtcode)
    - [spinalRelationRef.getNbChildren() ⇒ <code>number</code>](#spinalrelationrefgetnbchildren-%E2%87%92-codenumbercode)
    - [spinalRelationRef.getChildren() ⇒ <code>Promise.&lt;Array.&lt;SpinalNodeAny&gt;&gt;</code>](#spinalrelationrefgetchildren-%E2%87%92-codepromiseltarrayltspinalnodeanygtgtcode)
    - [spinalRelationRef.getChildrenInContext(context) ⇒ <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code>](#spinalrelationrefgetchildrenincontextcontext-%E2%87%92-codepromiseltarrayltspinalnodegtgtcode)
    - [spinalRelationRef.getType() ⇒ <code>string</code>](#spinalrelationrefgettype-%E2%87%92-codestringcode)
    - [spinalRelationRef.addChild(node) ⇒ <code>Promise.&lt;SpinalNode.&lt;T&gt;&gt;</code>](#spinalrelationrefaddchildnode-%E2%87%92-codepromiseltspinalnodelttgtgtcode)
    - [spinalRelationRef.removeChild(node) ⇒ <code>Promise.&lt;void&gt;</code>](#spinalrelationrefremovechildnode-%E2%87%92-codepromiseltvoidgtcode)
    - [spinalRelationRef.getId() ⇒ <code>spinal.Str</code>](#spinalrelationrefgetid-%E2%87%92-codespinalstrcode)
    - [spinalRelationRef.getName() ⇒ <code>spinal.Str</code>](#spinalrelationrefgetname-%E2%87%92-codespinalstrcode)
    - [spinalRelationRef.getParent() ⇒ <code>Promise.&lt;SpinalNode.&lt;spinal.Model&gt;&gt;</code>](#spinalrelationrefgetparent-%E2%87%92-codepromiseltspinalnodeltspinalmodelgtgtcode)
    - [spinalRelationRef.addContextId(id)](#spinalrelationrefaddcontextidid)
    - [spinalRelationRef.getContextIds() ⇒ <code>Array.&lt;string&gt;</code>](#spinalrelationrefgetcontextids-%E2%87%92-codearrayltstringgtcode)
    - [spinalRelationRef.belongsToContext(context) ⇒ <code>boolean</code>](#spinalrelationrefbelongstocontextcontext-%E2%87%92-codebooleancode)
    - [spinalRelationRef.removeChildren([nodesToDelete]) ⇒ <code>Promise.&lt;void&gt;</code>](#spinalrelationrefremovechildrennodestodelete-%E2%87%92-codepromiseltvoidgtcode)
    - [spinalRelationRef.removeFromGraph() ⇒ <code>Promise.&lt;void&gt;</code>](#spinalrelationrefremovefromgraph-%E2%87%92-codepromiseltvoidgtcode)
    - [SpinalRelationRef.SpinalRelationRef](#spinalrelationrefspinalrelationref)
      - [new SpinalRelationRef(parent, name)](#new-spinalrelationrefparent-name)
  - [SpinalMap ⇐ <code>Model</code>](#spinalmap-%E2%87%90-codemodelcode)
    - [spinalMap.setElement(key, value)](#spinalmapsetelementkey-value)
    - [spinalMap.getElement(key) ⇒ <code>T</code>](#spinalmapgetelementkey-%E2%87%92-codetcode)
    - [spinalMap.has(key) ⇒ <code>boolean</code>](#spinalmaphaskey-%E2%87%92-codebooleancode)
    - [spinalMap.hasKey() ⇒ <code>boolean</code>](#spinalmaphaskey-%E2%87%92-codebooleancode)
    - [spinalMap.keys() ⇒ <code>Array.&lt;string&gt;</code>](#spinalmapkeys-%E2%87%92-codearrayltstringgtcode)
    - [spinalMap.entries() ⇒ <code>Array.&lt;Array.&lt;string, T&gt;&gt;</code>](#spinalmapentries-%E2%87%92-codearrayltarrayltstring-tgtgtcode)
    - [spinalMap.delete(key)](#spinalmapdeletekey)
    - [spinalMap.clear()](#spinalmapclear)
    - [spinalMap.forEach(fun)](#spinalmapforeachfun)
    - [SpinalMap.SpinalMap](#spinalmapspinalmap)
      - [new SpinalMap([init])](#new-spinalmapinit)
  - [SpinalNodePointer ⇐ <code>Model</code>](#spinalnodepointer-%E2%87%90-codemodelcode)
    - [new SpinalNodePointer()](#new-spinalnodepointer)
    - [spinalNodePointer.setElement(element)](#spinalnodepointersetelementelement)
    - [spinalNodePointer.load() ⇒ <code>Promise.&lt;T&gt;</code>](#spinalnodepointerload-%E2%87%92-codepromiselttgtcode)
    - [spinalNodePointer.unset()](#spinalnodepointerunset)
    - [spinalNodePointer.getId() ⇒ <code>spinal.Str</code>](#spinalnodepointergetid-%E2%87%92-codespinalstrcode)
    - [spinalNodePointer.getType() ⇒ <code>spinal.Str</code>](#spinalnodepointergettype-%E2%87%92-codespinalstrcode)
    - [SpinalNodePointer.SpinalNodePointer](#spinalnodepointerspinalnodepointer)
      - [new SpinalNodePointer(element)](#new-spinalnodepointerelement)
  - [SpinalSet ⇐ <code>Model</code>](#spinalset-%E2%87%90-codemodelcode)
    - [spinalSet.add(value)](#spinalsetaddvalue)
    - [spinalSet.has(value) ⇒ <code>boolean</code>](#spinalsethasvalue-%E2%87%92-codebooleancode)
    - [spinalSet.values() ⇒ <code>Array.&lt;string&gt;</code>](#spinalsetvalues-%E2%87%92-codearrayltstringgtcode)
    - [spinalSet.delete(value)](#spinalsetdeletevalue)
    - [spinalSet.clear()](#spinalsetclear)
    - [spinalSet.size() ⇒ <code>number</code>](#spinalsetsize-%E2%87%92-codenumbercode)
    - [spinalSet.forEach(fun)](#spinalsetforeachfun)
    - [SpinalSet.SpinalSet](#spinalsetspinalset)
      - [new SpinalSet([init])](#new-spinalsetinit)
  - [*RELATION\_TYPE\_LIST*](#relation%5C_type%5C_list)
  - [s4() ⇒ <code>String</code>](#s4-%E2%87%92-codestringcode)
  - [guid(name) ⇒ <code>string</code>](#guidname-%E2%87%92-codestringcode)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Description

The spinal graph is a data structure, using Spinalcom Model Definitions.

# Synopsis

Code samples in [Tutos/HowToCreateAContext.js](Tutos/HowToCreateAContext.js)

# API
## Classes

<dl>
<dt><a href="#SpinalContext">SpinalContext</a> ⇐ <code>SpinalNode&lt;T&gt;</code></dt>
<dd></dd>
<dt><a href="#SpinalContext">SpinalContext</a></dt>
<dd></dd>
<dt><a href="#SpinalGraph">SpinalGraph</a> ⇐ <code><a href="#SpinalNode">SpinalNode</a></code></dt>
<dd><p>Starting node of a graph.</p></dd>
<dt><a href="#SpinalNode">SpinalNode</a> ⇐ <code>Model</code></dt>
<dd><p>Node of a graph.</p></dd>
<dt><a href="#BaseSpinalRelation">BaseSpinalRelation</a> ⇐ <code>Model</code></dt>
<dd><p>Base for all relation in a SpinalGraph.</p></dd>
<dt><a href="#SpinalRelationLstPtr">SpinalRelationLstPtr</a> ⇐ <code><a href="#BaseSpinalRelation">BaseSpinalRelation</a></code></dt>
<dd><p>Relation where the children are in Lst of Ptr.</p></dd>
<dt><a href="#SpinalRelationPtrLst">SpinalRelationPtrLst</a> ⇐ <code><a href="#BaseSpinalRelation">BaseSpinalRelation</a></code></dt>
<dd></dd>
<dt><a href="#SpinalRelationPtrLst">SpinalRelationPtrLst</a></dt>
<dd></dd>
<dt><a href="#SpinalRelationRef">SpinalRelationRef</a> ⇐ <code><a href="#BaseSpinalRelation">BaseSpinalRelation</a></code></dt>
<dd></dd>
<dt><a href="#SpinalMap">SpinalMap</a> ⇐ <code>Model</code></dt>
<dd></dd>
<dt><a href="#SpinalNodePointer">SpinalNodePointer</a> ⇐ <code>Model</code></dt>
<dd></dd>
<dt><a href="#SpinalSet">SpinalSet</a> ⇐ <code>Model</code></dt>
<dd></dd>
</dl>

## Members

<dl>
<dt><a href="#RELATION_TYPE_LIST">RELATION_TYPE_LIST</a></dt>
<dd><p>Namespace for general relation functions.</p></dd>
</dl>

## Functions

<dl>
<dt><a href="#s4">s4()</a> ⇒ <code>String</code></dt>
<dd><p>Generates a random number and returns in a string.</p></dd>
<dt><a href="#guid">guid(name)</a> ⇒ <code>string</code></dt>
<dd><p>Creates a unique id based on a name.</p></dd>
</dl>

<a name="SpinalContext"></a>

## SpinalContext ⇐ <code>SpinalNode&lt;T&gt;</code>
**Kind**: global class  
**Extends**: <code>SpinalNode&lt;T&gt;</code>  
**Template**: T  

* [SpinalContext](#SpinalContext) ⇐ <code>SpinalNode&lt;T&gt;</code>
    * [new SpinalContext()](#new_SpinalContext_new)
    * [new SpinalContext([name], [type], [element])](#new_SpinalContext_new)
    * [.addChild(child, relationName, [relationType])](#SpinalContext+addChild) ⇒ [<code>Promise.&lt;SpinalNode&gt;</code>](#SpinalNode)
    * [.addChildInContext(child, relationName, [relationType], context)](#SpinalContext+addChildInContext) ⇒ [<code>Promise.&lt;SpinalNode&gt;</code>](#SpinalNode)
    * [.getChildrenInContext([context])](#SpinalContext+getChildrenInContext) ⇒ <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code>

<a name="new_SpinalContext_new"></a>

### new SpinalContext()
<p>A SpinalContext is the statring node of a part of the graph.</p>

<a name="new_SpinalContext_new"></a>

### new SpinalContext([name], [type], [element])
<p>Constructor for the SpinalContext class.</p>

**Throws**:

- <code>TypeError</code> <p>If the element is not a Model</p>


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [name] | <code>String</code> | <code>&quot;undefined&quot;</code> | <p>Name of the context</p> |
| [type] | <code>String</code> | <code>&quot;SpinalContext&quot;</code> | <p>Type of the context, usually unused</p> |
| [element] | [<code>SpinalNode</code>](#SpinalNode) \| <code>Model</code> |  | <p>Element of the context</p> |

<a name="SpinalContext+addChild"></a>

### spinalContext.addChild(child, relationName, [relationType]) ⇒ [<code>Promise.&lt;SpinalNode&gt;</code>](#SpinalNode)
<p>Adds a child with a SpinalRelationLstPtrType.</p>

**Kind**: instance method of [<code>SpinalContext</code>](#SpinalContext)  
**Returns**: [<code>Promise.&lt;SpinalNode&gt;</code>](#SpinalNode) - <p>The child node in a promise</p>  
**Throws**:

- <code>TypeError</code> <p>If the child is not a model</p>
- <code>TypeError</code> <p>If the relation name is not a string</p>


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| child | [<code>SpinalNode</code>](#SpinalNode) \| <code>Model</code> |  | <p>Node to add as child</p> |
| relationName | <code>String</code> |  | <p>Name of the relation</p> |
| [relationType] | <code>String</code> | <code>SPINAL_RELATION_PTR_LST_TYPE</code> | <p>This parameter is here only to properly override the parent method</p> |

<a name="SpinalContext+addChildInContext"></a>

### spinalContext.addChildInContext(child, relationName, [relationType], context) ⇒ [<code>Promise.&lt;SpinalNode&gt;</code>](#SpinalNode)
<p>Adds a child with a SpinalRelationLstPtrType and notices
the context if a new relation was created.</p>

**Kind**: instance method of [<code>SpinalContext</code>](#SpinalContext)  
**Returns**: [<code>Promise.&lt;SpinalNode&gt;</code>](#SpinalNode) - <p>The child node in a promise</p>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| child | [<code>SpinalNode</code>](#SpinalNode) \| <code>Model</code> |  | <p>Node to add as child</p> |
| relationName | <code>String</code> |  | <p>Name of the relation</p> |
| [relationType] | <code>String</code> | <code>SPINAL_RELATION_PTR_LST_TYPE</code> | <p>This parameter is here only to properly override the parent method</p> |
| context | [<code>SpinalContext</code>](#SpinalContext) |  | <p>Context to update, usually unused</p> |

<a name="SpinalContext+getChildrenInContext"></a>

### spinalContext.getChildrenInContext([context]) ⇒ <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code>
<p>Return the children of the node that are registered in the context</p>

**Kind**: instance method of [<code>SpinalContext</code>](#SpinalContext)  
**Returns**: <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code> - <p>The children that were found</p>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [context] | [<code>SpinalContext</code>](#SpinalContext) | <code>this</code> | <p>Context to use for the search, this by default</p> |

<a name="SpinalContext"></a>

## SpinalContext
**Kind**: global class  

* [SpinalContext](#SpinalContext)
    * [new SpinalContext()](#new_SpinalContext_new)
    * [new SpinalContext([name], [type], [element])](#new_SpinalContext_new)
    * [.addChild(child, relationName, [relationType])](#SpinalContext+addChild) ⇒ [<code>Promise.&lt;SpinalNode&gt;</code>](#SpinalNode)
    * [.addChildInContext(child, relationName, [relationType], context)](#SpinalContext+addChildInContext) ⇒ [<code>Promise.&lt;SpinalNode&gt;</code>](#SpinalNode)
    * [.getChildrenInContext([context])](#SpinalContext+getChildrenInContext) ⇒ <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code>

<a name="new_SpinalContext_new"></a>

### new SpinalContext()
<p>A SpinalContext is the statring node of a part of the graph.</p>

<a name="new_SpinalContext_new"></a>

### new SpinalContext([name], [type], [element])
<p>Constructor for the SpinalContext class.</p>

**Throws**:

- <code>TypeError</code> <p>If the element is not a Model</p>


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [name] | <code>String</code> | <code>&quot;undefined&quot;</code> | <p>Name of the context</p> |
| [type] | <code>String</code> | <code>&quot;SpinalContext&quot;</code> | <p>Type of the context, usually unused</p> |
| [element] | [<code>SpinalNode</code>](#SpinalNode) \| <code>Model</code> |  | <p>Element of the context</p> |

<a name="SpinalContext+addChild"></a>

### spinalContext.addChild(child, relationName, [relationType]) ⇒ [<code>Promise.&lt;SpinalNode&gt;</code>](#SpinalNode)
<p>Adds a child with a SpinalRelationLstPtrType.</p>

**Kind**: instance method of [<code>SpinalContext</code>](#SpinalContext)  
**Returns**: [<code>Promise.&lt;SpinalNode&gt;</code>](#SpinalNode) - <p>The child node in a promise</p>  
**Throws**:

- <code>TypeError</code> <p>If the child is not a model</p>
- <code>TypeError</code> <p>If the relation name is not a string</p>


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| child | [<code>SpinalNode</code>](#SpinalNode) \| <code>Model</code> |  | <p>Node to add as child</p> |
| relationName | <code>String</code> |  | <p>Name of the relation</p> |
| [relationType] | <code>String</code> | <code>SPINAL_RELATION_PTR_LST_TYPE</code> | <p>This parameter is here only to properly override the parent method</p> |

<a name="SpinalContext+addChildInContext"></a>

### spinalContext.addChildInContext(child, relationName, [relationType], context) ⇒ [<code>Promise.&lt;SpinalNode&gt;</code>](#SpinalNode)
<p>Adds a child with a SpinalRelationLstPtrType and notices
the context if a new relation was created.</p>

**Kind**: instance method of [<code>SpinalContext</code>](#SpinalContext)  
**Returns**: [<code>Promise.&lt;SpinalNode&gt;</code>](#SpinalNode) - <p>The child node in a promise</p>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| child | [<code>SpinalNode</code>](#SpinalNode) \| <code>Model</code> |  | <p>Node to add as child</p> |
| relationName | <code>String</code> |  | <p>Name of the relation</p> |
| [relationType] | <code>String</code> | <code>SPINAL_RELATION_PTR_LST_TYPE</code> | <p>This parameter is here only to properly override the parent method</p> |
| context | [<code>SpinalContext</code>](#SpinalContext) |  | <p>Context to update, usually unused</p> |

<a name="SpinalContext+getChildrenInContext"></a>

### spinalContext.getChildrenInContext([context]) ⇒ <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code>
<p>Return the children of the node that are registered in the context</p>

**Kind**: instance method of [<code>SpinalContext</code>](#SpinalContext)  
**Returns**: <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code> - <p>The children that were found</p>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [context] | [<code>SpinalContext</code>](#SpinalContext) | <code>this</code> | <p>Context to use for the search, this by default</p> |

<a name="SpinalGraph"></a>

## SpinalGraph ⇐ [<code>SpinalNode</code>](#SpinalNode)
<p>Starting node of a graph.</p>

**Kind**: global class  
**Extends**: [<code>SpinalNode</code>](#SpinalNode)  

* [SpinalGraph](#SpinalGraph) ⇐ [<code>SpinalNode</code>](#SpinalNode)
    * [new SpinalGraph([name], [type], [element])](#new_SpinalGraph_new)
    * [.addContext(context)](#SpinalGraph+addContext) ⇒ [<code>Promise.&lt;SpinalContext&gt;</code>](#SpinalContext)
    * [.getContext(name)](#SpinalGraph+getContext) ⇒ [<code>SpinalContext</code>](#SpinalContext) \| <code>undefined</code>
    * [.getId()](#SpinalNode+getId) ⇒ <code>spinal.Str</code>
    * [.getName()](#SpinalNode+getName) ⇒ <code>spinal.Str</code>
    * [.getType()](#SpinalNode+getType) ⇒ <code>spinal.Str</code>
    * [.getElement()](#SpinalNode+getElement) ⇒ <code>Promise.&lt;T&gt;</code>
    * [.getChildrenIds()](#SpinalNode+getChildrenIds) ⇒ <code>Array.&lt;string&gt;</code>
    * [.getNbChildren()](#SpinalNode+getNbChildren) ⇒ <code>number</code>
    * [.addContextId(id)](#SpinalNode+addContextId)
    * [.getContextIds()](#SpinalNode+getContextIds) ⇒ <code>Array.&lt;string&gt;</code>
    * [.belongsToContext(context)](#SpinalNode+belongsToContext) ⇒ <code>boolean</code>
    * [.hasRelation(relationName, relationType)](#SpinalNode+hasRelation) ⇒ <code>boolean</code>
    * [.hasRelations(relationNames, relationType)](#SpinalNode+hasRelations) ⇒ <code>boolean</code>
    * [.getRelationNames()](#SpinalNode+getRelationNames) ⇒ <code>Array.&lt;string&gt;</code>
    * [.addChild(child, relationName, relationType)](#SpinalNode+addChild) ⇒ [<code>Promise.&lt;SpinalNode&gt;</code>](#SpinalNode)
    * [.addChildInContext(child, relationName, relationType, context)](#SpinalNode+addChildInContext) ⇒ [<code>Promise.&lt;SpinalNode&gt;</code>](#SpinalNode)
    * [.removeChild(node, relationName, relationType)](#SpinalNode+removeChild) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.removeChildren(nodes, relationName, relationType)](#SpinalNode+removeChildren) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.removeRelation(relationName, relationType)](#SpinalNode+removeRelation) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.removeFromGraph()](#SpinalNode+removeFromGraph) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.getChild(predicate, relationName, relationType)](#SpinalNode+getChild) ⇒ <code>Promise.&lt;SpinalNode.&lt;any&gt;&gt;</code>
    * [.getChildren([relationNames])](#SpinalNode+getChildren) ⇒ <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code>
    * [.getChildrenInContext(context)](#SpinalNode+getChildrenInContext) ⇒ <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code>
    * [.getParents([relationNames])](#SpinalNode+getParents) ⇒ <code>Promise.&lt;Array.&lt;SpinalNode.&lt;any&gt;&gt;&gt;</code>
    * [.find(relationNames, predicate)](#SpinalNode+find) ⇒ <code>Promise.&lt;Array.&lt;SpinalNode.&lt;any&gt;&gt;&gt;</code>
    * [.findInContext(context, predicate)](#SpinalNode+findInContext) ⇒ <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code>
    * [.forEach(relationNames, callback)](#SpinalNode+forEach)
    * [.forEachInContext(context, callback)](#SpinalNode+forEachInContext)
    * [.map(relationNames, callback)](#SpinalNode+map) ⇒ <code>Promise.&lt;Array.&lt;any&gt;&gt;</code>
    * [.mapInContext(context, callback)](#SpinalNode+mapInContext) ⇒ <code>Promise.&lt;Array.&lt;\*&gt;&gt;</code>
    * [._getRelation(relationName, relationType)](#SpinalNode+_getRelation) ⇒ <code>SpinalRelation</code>
    * [._removeParent(relation)](#SpinalNode+_removeParent)
    * [._removeFromParents()](#SpinalNode+_removeFromParents)
    * [._addParent(relation)](#SpinalNode+_addParent)
    * [._createRelation(relationName, relationType)](#SpinalNode+_createRelation)
    * [._removeFromChildren()](#SpinalNode+_removeFromChildren) ⇒ <code>Promise.&lt;void&gt;</code>

<a name="new_SpinalGraph_new"></a>

### new SpinalGraph([name], [type], [element])
<p>Constructor for the SpinalGraph class.</p>


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [name] | <code>String</code> | <code>&quot;undefined&quot;</code> | <p>Name of the graph, usually unused</p> |
| [type] | <code>String</code> | <code>&quot;SpinalGraph&quot;</code> | <p>Type of the graph, usually unused</p> |
| [element] | [<code>SpinalNode</code>](#SpinalNode) \| <code>Model</code> |  | <p>Element of the graph</p> |

<a name="SpinalGraph+addContext"></a>

### spinalGraph.addContext(context) ⇒ [<code>Promise.&lt;SpinalContext&gt;</code>](#SpinalContext)
<p>Adds a context to the graph.</p>

**Kind**: instance method of [<code>SpinalGraph</code>](#SpinalGraph)  
**Returns**: [<code>Promise.&lt;SpinalContext&gt;</code>](#SpinalContext) - <p>The added context</p>  
**Throws**:

- <code>TypeError</code> <p>If the context is not a context</p>


| Param | Type | Description |
| --- | --- | --- |
| context | [<code>SpinalContext</code>](#SpinalContext) | <p>Context to be added</p> |

<a name="SpinalGraph+getContext"></a>

### spinalGraph.getContext(name) ⇒ [<code>SpinalContext</code>](#SpinalContext) \| <code>undefined</code>
<p>Searches for a context using its name.</p>

**Kind**: instance method of [<code>SpinalGraph</code>](#SpinalGraph)  
**Returns**: [<code>SpinalContext</code>](#SpinalContext) \| <code>undefined</code> - <p>The wanted context or undefined</p>  
**Throws**:

- <code>TypeError</code> <p>If name is not a string</p>


| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | <p>Name of the context</p> |

<a name="SpinalNode+getId"></a>

### spinalGraph.getId() ⇒ <code>spinal.Str</code>
<p>Returns the id.</p>

**Kind**: instance method of [<code>SpinalGraph</code>](#SpinalGraph)  
**Returns**: <code>spinal.Str</code> - <p>Id of the node</p>  
<a name="SpinalNode+getName"></a>

### spinalGraph.getName() ⇒ <code>spinal.Str</code>
<p>Returns the name.</p>

**Kind**: instance method of [<code>SpinalGraph</code>](#SpinalGraph)  
**Returns**: <code>spinal.Str</code> - <p>Name of the node</p>  
<a name="SpinalNode+getType"></a>

### spinalGraph.getType() ⇒ <code>spinal.Str</code>
<p>Returns the type.</p>

**Kind**: instance method of [<code>SpinalGraph</code>](#SpinalGraph)  
**Returns**: <code>spinal.Str</code> - <p>Type of the node</p>  
<a name="SpinalNode+getElement"></a>

### spinalGraph.getElement() ⇒ <code>Promise.&lt;T&gt;</code>
<p>Returns the element.</p>

**Kind**: instance method of [<code>SpinalGraph</code>](#SpinalGraph)  
**Returns**: <code>Promise.&lt;T&gt;</code> - <p>A promise where the parameter of the resolve method is the element</p>  
<a name="SpinalNode+getChildrenIds"></a>

### spinalGraph.getChildrenIds() ⇒ <code>Array.&lt;string&gt;</code>
<p>Returns all the children ids in an array.</p>

**Kind**: instance method of [<code>SpinalGraph</code>](#SpinalGraph)  
**Returns**: <code>Array.&lt;string&gt;</code> - <p>Ids of the children</p>  
<a name="SpinalNode+getNbChildren"></a>

### spinalGraph.getNbChildren() ⇒ <code>number</code>
<p>Computes and returns the number of children of the node.</p>

**Kind**: instance method of [<code>SpinalGraph</code>](#SpinalGraph)  
**Returns**: <code>number</code> - <p>The number of children</p>  
<a name="SpinalNode+addContextId"></a>

### spinalGraph.addContextId(id)
<p>Adds an id to the context ids of the node.</p>

**Kind**: instance method of [<code>SpinalGraph</code>](#SpinalGraph)  
**Throws**:

- <code>TypeError</code> <p>If the id is not a string</p>


| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | <p>Id of the context</p> |

<a name="SpinalNode+getContextIds"></a>

### spinalGraph.getContextIds() ⇒ <code>Array.&lt;string&gt;</code>
<p>Returns a list of the contexts the node is associated to.</p>

**Kind**: instance method of [<code>SpinalGraph</code>](#SpinalGraph)  
**Returns**: <code>Array.&lt;string&gt;</code> - <p>An array of ids of the associated contexts</p>  
<a name="SpinalNode+belongsToContext"></a>

### spinalGraph.belongsToContext(context) ⇒ <code>boolean</code>
<p>Returns true if the node belongs to the context.</p>

**Kind**: instance method of [<code>SpinalGraph</code>](#SpinalGraph)  
**Returns**: <code>boolean</code> - <p>A boolean</p>  
**Throws**:

- <code>TypeError</code> <p>If context is not a SpinalContext</p>


| Param | Type | Description |
| --- | --- | --- |
| context | [<code>SpinalContext</code>](#SpinalContext) | <p>The context that might own the node</p> |

<a name="SpinalNode+hasRelation"></a>

### spinalGraph.hasRelation(relationName, relationType) ⇒ <code>boolean</code>
<p>Verify if the node contains the relation name.</p>

**Kind**: instance method of [<code>SpinalGraph</code>](#SpinalGraph)  
**Returns**: <code>boolean</code> - <p>Return true is the relation is contained in the node and false otherwise.</p>  
**Throws**:

- <code>TypeError</code> <p>If the relation name is not a string</p>
- <code>Error</code> <p>If the relation type doesn't exist</p>


| Param | Type | Description |
| --- | --- | --- |
| relationName | <code>string</code> | <p>Name of the relation</p> |
| relationType | <code>string</code> | <p>Type of the relation</p> |

<a name="SpinalNode+hasRelations"></a>

### spinalGraph.hasRelations(relationNames, relationType) ⇒ <code>boolean</code>
<p>Verify if the node contains all the relation names.</p>

**Kind**: instance method of [<code>SpinalGraph</code>](#SpinalGraph)  
**Returns**: <code>boolean</code> - <p>Return true if the node contains
all the relations in relationNames,false otherwise.</p>  
**Throws**:

- <code>TypeError</code> <p>If the relation names are not in an array</p>
- <code>TypeError</code> <p>If one of the relation names is not a string</p>
- <code>Error</code> <p>If the relation type doesn't exist</p>


| Param | Type | Description |
| --- | --- | --- |
| relationNames | <code>Array.&lt;string&gt;</code> | <p>Array containing all the relation name</p> |
| relationType | <code>string</code> | <p>Type of the relations</p> |

<a name="SpinalNode+getRelationNames"></a>

### spinalGraph.getRelationNames() ⇒ <code>Array.&lt;string&gt;</code>
<p>Returns all the relation names of the node.</p>

**Kind**: instance method of [<code>SpinalGraph</code>](#SpinalGraph)  
**Returns**: <code>Array.&lt;string&gt;</code> - <p>The names of the relations of the node</p>  
<a name="SpinalNode+addChild"></a>

### spinalGraph.addChild(child, relationName, relationType) ⇒ [<code>Promise.&lt;SpinalNode&gt;</code>](#SpinalNode)
<p>Add the node as child of the relation.</p>

**Kind**: instance method of [<code>SpinalGraph</code>](#SpinalGraph)  
**Returns**: [<code>Promise.&lt;SpinalNode&gt;</code>](#SpinalNode) - <p>The child node in a promise</p>  
**Throws**:

- <code>TypeError</code> <p>If the child is not a model</p>
- <code>TypeError</code> <p>If the relation name is not a string</p>
- <code>Error</code> <p>If the relation type is invalid</p>


| Param | Type | Description |
| --- | --- | --- |
| child | <code>T</code> \| <code>SpinalNode.&lt;T&gt;</code> | <p>Element to add as child</p> |
| relationName | <code>string</code> | <p>Name of the relation</p> |
| relationType | <code>string</code> | <p>Type of the relation</p> |

<a name="SpinalNode+addChildInContext"></a>

### spinalGraph.addChildInContext(child, relationName, relationType, context) ⇒ [<code>Promise.&lt;SpinalNode&gt;</code>](#SpinalNode)
<p>Adds a child and notices the context if a new relation was created.</p>

**Kind**: instance method of [<code>SpinalGraph</code>](#SpinalGraph)  
**Returns**: [<code>Promise.&lt;SpinalNode&gt;</code>](#SpinalNode) - <p>The child node in a promise</p>  
**Throws**:

- <code>TypeError</code> <p>If the child is not a model</p>
- <code>TypeError</code> <p>If the relation name is not a string</p>
- <code>TypeError</code> <p>If the context is not a SpinalContext</p>
- <code>Error</code> <p>If the relation type is invalid</p>


| Param | Type | Description |
| --- | --- | --- |
| child | [<code>SpinalNode</code>](#SpinalNode) \| <code>Model</code> | <p>Node to add as child</p> |
| relationName | <code>string</code> | <p>Name of the relation</p> |
| relationType | <code>string</code> | <p>Type of the relation</p> |
| context | [<code>SpinalContext</code>](#SpinalContext) | <p>Context to update</p> |

<a name="SpinalNode+removeChild"></a>

### spinalGraph.removeChild(node, relationName, relationType) ⇒ <code>Promise.&lt;void&gt;</code>
<p>Removes the node from the relation children.</p>

**Kind**: instance method of [<code>SpinalGraph</code>](#SpinalGraph)  
**Returns**: <code>Promise.&lt;void&gt;</code> - <p>An empty promise</p>  
**Throws**:

- <code>TypeError</code> <p>If relation name is not a string</p>
- <code>Error</code> <p>If relation type is invalid</p>
- <code>Error</code> <p>If relation doesn't exist</p>
- <code>Error</code> <p>If the child doesn't exist</p>


| Param | Type | Description |
| --- | --- | --- |
| node | [<code>SpinalNode</code>](#SpinalNode) | <p>Node to remove</p> |
| relationName | <code>string</code> | <p>Name of the relation to wich the node belongs</p> |
| relationType | <code>string</code> | <p>Type of the relation to wich the node belongs</p> |

<a name="SpinalNode+removeChildren"></a>

### spinalGraph.removeChildren(nodes, relationName, relationType) ⇒ <code>Promise.&lt;void&gt;</code>
<p>Removes children in the given relation.</p>

**Kind**: instance method of [<code>SpinalGraph</code>](#SpinalGraph)  
**Returns**: <code>Promise.&lt;void&gt;</code> - <p>An empty promise</p>  
**Throws**:

- <code>TypeError</code> <p>If nodes is not an array</p>
- <code>TypeError</code> <p>If an element of nodes is not a SpinalNode</p>
- <code>TypeError</code> <p>If relation name is not a string</p>
- <code>Error</code> <p>If relation type is invalid</p>
- <code>Error</code> <p>If the relation doesn't exist</p>
- <code>Error</code> <p>If one of the nodes is not a child</p>


| Param | Type | Description |
| --- | --- | --- |
| nodes | [<code>Array.&lt;SpinalNode&gt;</code>](#SpinalNode) | <p>Nodes to delete</p> |
| relationName | <code>string</code> | <p>Name of the relation</p> |
| relationType | <code>string</code> | <p>Type of the relation</p> |

<a name="SpinalNode+removeRelation"></a>

### spinalGraph.removeRelation(relationName, relationType) ⇒ <code>Promise.&lt;void&gt;</code>
<p>Removes a child relation of the node.</p>

**Kind**: instance method of [<code>SpinalGraph</code>](#SpinalGraph)  
**Returns**: <code>Promise.&lt;void&gt;</code> - <p>An empty promise</p>  
**Throws**:

- <code>TypeError</code> <p>If the relationName is not a string</p>
- <code>Error</code> <p>If the relationType is invalid</p>
- <code>Error</code> <p>If the relation doesn't exist</p>


| Param | Type | Description |
| --- | --- | --- |
| relationName | <code>string</code> | <p>Name of the relation to remove</p> |
| relationType | <code>string</code> | <p>Type of the relation to remove</p> |

<a name="SpinalNode+removeFromGraph"></a>

### spinalGraph.removeFromGraph() ⇒ <code>Promise.&lt;void&gt;</code>
<p>Remove the node from the graph
i.e remove the node from all the parent relations and remove all the children relations.
This operation might delete all the sub-graph under this node.
After this operation the node can be deleted without fear.</p>

**Kind**: instance method of [<code>SpinalGraph</code>](#SpinalGraph)  
**Overrides**: [<code>removeFromGraph</code>](#SpinalNode+removeFromGraph)  
**Returns**: <code>Promise.&lt;void&gt;</code> - <p>An empty promise</p>  
<a name="SpinalNode+getChild"></a>

### spinalGraph.getChild(predicate, relationName, relationType) ⇒ <code>Promise.&lt;SpinalNode.&lt;any&gt;&gt;</code>
<p>Returns the first child in the given relation for which the predicate is true.</p>

**Kind**: instance method of [<code>SpinalGraph</code>](#SpinalGraph)  
**Returns**: <code>Promise.&lt;SpinalNode.&lt;any&gt;&gt;</code> - <p>The first child for which the predicate is true or undefined</p>  
**Throws**:

- <code>TypeError</code> <p>If predicate is not a function</p>
- <code>TypeError</code> <p>If relation name is not a string</p>
- <code>Error</code> <p>If relation type is invalid</p>
- <code>Error</code> <p>If relation doesn't exist</p>


| Param | Type | Description |
| --- | --- | --- |
| predicate | <code>SpinalNodeFindPredicateFunc</code> | <p>Functions that takes a node and returns a boolean</p> |
| relationName | <code>string</code> | <p>Name of the relation</p> |
| relationType | <code>string</code> | <p>Type of the relation</p> |

<a name="SpinalNode+getChildren"></a>

### spinalGraph.getChildren([relationNames]) ⇒ <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code>
<p>Returns the children of the node for the relation names.</p>

**Kind**: instance method of [<code>SpinalGraph</code>](#SpinalGraph)  
**Returns**: <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code> - <p>The children that were found</p>  
**Throws**:

- <code>TypeError</code> <p>If relationNames is neither an array, a string or omitted</p>
- <code>TypeError</code> <p>If an element of relationNames is not a string</p>


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [relationNames] | <code>Array.&lt;string&gt;</code> | <code>[]</code> | <p>Array containing the relation names of the desired children</p> |

<a name="SpinalNode+getChildrenInContext"></a>

### spinalGraph.getChildrenInContext(context) ⇒ <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code>
<p>Return the children of the node that are registered in the context</p>

**Kind**: instance method of [<code>SpinalGraph</code>](#SpinalGraph)  
**Returns**: <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code> - <p>The children that were found</p>  
**Throws**:

- <code>TypeError</code> <p>If the context is not a SpinalContext</p>


| Param | Type | Description |
| --- | --- | --- |
| context | [<code>SpinalContext</code>](#SpinalContext) | <p>Context to use for the search</p> |

<a name="SpinalNode+getParents"></a>

### spinalGraph.getParents([relationNames]) ⇒ <code>Promise.&lt;Array.&lt;SpinalNode.&lt;any&gt;&gt;&gt;</code>
<p>Return all parents for the relation names no matter the type of relation</p>

**Kind**: instance method of [<code>SpinalGraph</code>](#SpinalGraph)  
**Returns**: <code>Promise.&lt;Array.&lt;SpinalNode.&lt;any&gt;&gt;&gt;</code> - <p>Promise containing the parents that were found</p>  
**Throws**:

- <code>TypeError</code> <p>If the relationNames are neither an array, a string or omitted</p>
- <code>TypeError</code> <p>If an element of relationNames is not a string</p>


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [relationNames] | <code>Array.&lt;String&gt;</code> | <code>[]</code> | <p>Array containing the relation names of the desired parents</p> |

<a name="SpinalNode+find"></a>

### spinalGraph.find(relationNames, predicate) ⇒ <code>Promise.&lt;Array.&lt;SpinalNode.&lt;any&gt;&gt;&gt;</code>
<p>Recursively finds all the children nodes for which the predicate is true.</p>

**Kind**: instance method of [<code>SpinalGraph</code>](#SpinalGraph)  
**Returns**: <code>Promise.&lt;Array.&lt;SpinalNode.&lt;any&gt;&gt;&gt;</code> - <p>The nodes that were found</p>  
**Throws**:

- <code>TypeError</code> <p>If the relationNames are neither an array, a string or omitted</p>
- <code>TypeError</code> <p>If an element of relationNames is not a string</p>
- <code>TypeError</code> <p>If the predicate is not a function</p>


| Param | Type | Description |
| --- | --- | --- |
| relationNames | <code>string</code> \| <code>Array.&lt;string&gt;</code> | <p>Array containing the relation names to follow</p> |
| predicate | <code>SpinalNodeFindPredicateFunc</code> | <p>Function returning true if the node needs to be returned</p> |

<a name="SpinalNode+findInContext"></a>

### spinalGraph.findInContext(context, predicate) ⇒ <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code>
<p>Recursively finds all the children nodes in the context for which the predicate is true..</p>

**Kind**: instance method of [<code>SpinalGraph</code>](#SpinalGraph)  
**Returns**: <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code> - <p>The nodes that were found</p>  
**Throws**:

- <code>TypeError</code> <p>If context is not a SpinalContext</p>
- <code>TypeError</code> <p>If the predicate is not a function</p>


| Param | Type | Description |
| --- | --- | --- |
| context | [<code>SpinalContext</code>](#SpinalContext) | <p>Context to use for the search</p> |
| predicate | <code>findPredicate</code> | <p>Function returning true if the node needs to be returned</p> |

<a name="SpinalNode+forEach"></a>

### spinalGraph.forEach(relationNames, callback)
<p>Recursively applies a function to all the children nodes.</p>

**Kind**: instance method of [<code>SpinalGraph</code>](#SpinalGraph)  
**Throws**:

- <code>TypeError</code> <p>If the relationNames are neither an array, a string or omitted</p>
- <code>TypeError</code> <p>If an element of relationNames is not a string</p>
- <code>TypeError</code> <p>If the callback is not a function</p>


| Param | Type | Description |
| --- | --- | --- |
| relationNames | <code>string</code> \| <code>Array.&lt;string&gt;</code> | <p>Array containing the relation names to follow</p> |
| callback | <code>SpinalNodeForEachFunc.&lt;SpinalNode.&lt;any&gt;&gt;</code> | <p>Function to apply to the nodes</p> |

<a name="SpinalNode+forEachInContext"></a>

### spinalGraph.forEachInContext(context, callback)
<p>Recursively applies a function to all the children nodes in the context.</p>

**Kind**: instance method of [<code>SpinalGraph</code>](#SpinalGraph)  
**Throws**:

- <code>TypeError</code> <p>If context is not a SpinalContext</p>
- <code>TypeError</code> <p>If the callback is not a function</p>


| Param | Type | Description |
| --- | --- | --- |
| context | [<code>SpinalContext</code>](#SpinalContext) | <p>Context to use for the search</p> |
| callback | <code>forEachCallback</code> | <p>Function to apply to the nodes</p> |

<a name="SpinalNode+map"></a>

### spinalGraph.map(relationNames, callback) ⇒ <code>Promise.&lt;Array.&lt;any&gt;&gt;</code>
<p>Recursively applies a function to all the children nodes and returns the results in an array.</p>

**Kind**: instance method of [<code>SpinalGraph</code>](#SpinalGraph)  
**Returns**: <code>Promise.&lt;Array.&lt;any&gt;&gt;</code> - <p>The results of the callback for each node</p>  
**Throws**:

- <code>TypeError</code> <p>If the relationNames are neither an array, a string or omitted</p>
- <code>TypeError</code> <p>If an element of relationNames is not a string</p>
- <code>TypeError</code> <p>If the callback is not a function</p>


| Param | Type | Description |
| --- | --- | --- |
| relationNames | <code>string</code> \| <code>Array.&lt;string&gt;</code> | <p>Array containing the relation names to follow</p> |
| callback | <code>SpinalNodeMapFunc</code> | <p>Function to apply to the nodes</p> |

<a name="SpinalNode+mapInContext"></a>

### spinalGraph.mapInContext(context, callback) ⇒ <code>Promise.&lt;Array.&lt;\*&gt;&gt;</code>
<p>Recursively applies a function to all the children nodes in the context
and returns the results in an array.</p>

**Kind**: instance method of [<code>SpinalGraph</code>](#SpinalGraph)  
**Returns**: <code>Promise.&lt;Array.&lt;\*&gt;&gt;</code> - <p>The results of the callback for each node</p>  
**Throws**:

- <code>TypeError</code> <p>If context is not a SpinalContext</p>
- <code>TypeError</code> <p>If the callback is not a function</p>


| Param | Type | Description |
| --- | --- | --- |
| context | [<code>SpinalContext</code>](#SpinalContext) | <p>Context to use for the search</p> |
| callback | <code>function</code> | <p>Function to apply to the nodes</p> |

<a name="SpinalNode+_getRelation"></a>

### spinalGraph.\_getRelation(relationName, relationType) ⇒ <code>SpinalRelation</code>
<p>Return the relation corresponding.</p>

**Kind**: instance method of [<code>SpinalGraph</code>](#SpinalGraph)  
**Returns**: <code>SpinalRelation</code> - <p>The relation corresponding</p>  
**Access**: protected  

| Param | Type | Description |
| --- | --- | --- |
| relationName | <code>string</code> | <p>Name of the relation</p> |
| relationType | <code>string</code> | <p>Type of the relation</p> |

<a name="SpinalNode+_removeParent"></a>

### spinalGraph.\_removeParent(relation)
<p>Removes a parent relation of the node.</p>

**Kind**: instance method of [<code>SpinalGraph</code>](#SpinalGraph)  
**Access**: protected  

| Param | Type | Description |
| --- | --- | --- |
| relation | <code>AnySpinalRelation</code> | <p>Relation to remove</p> |

<a name="SpinalNode+_removeFromParents"></a>

### spinalGraph.\_removeFromParents()
<p>Removes the node from all parent relation the property parents.</p>

**Kind**: instance method of [<code>SpinalGraph</code>](#SpinalGraph)  
**Access**: protected  
<a name="SpinalNode+_addParent"></a>

### spinalGraph.\_addParent(relation)
<p>Adds the relation as parent of the node.</p>

**Kind**: instance method of [<code>SpinalGraph</code>](#SpinalGraph)  
**Access**: protected  

| Param | Type | Description |
| --- | --- | --- |
| relation | <code>AnySpinalRelation</code> | <p>Parent relation</p> |

<a name="SpinalNode+_createRelation"></a>

### spinalGraph.\_createRelation(relationName, relationType)
<p>Create a new relation for this node.</p>

**Kind**: instance method of [<code>SpinalGraph</code>](#SpinalGraph)  
**Access**: protected  

| Param | Type | Description |
| --- | --- | --- |
| relationName | <code>string</code> | <p>Name of the relation</p> |
| relationType | <code>string</code> | <p>Type of the relation</p> |

<a name="SpinalNode+_removeFromChildren"></a>

### spinalGraph.\_removeFromChildren() ⇒ <code>Promise.&lt;void&gt;</code>
<p>Remove all children relation from the graph.</p>

**Kind**: instance method of [<code>SpinalGraph</code>](#SpinalGraph)  
**Returns**: <code>Promise.&lt;void&gt;</code> - <p>An empty promise</p>  
**Access**: protected  
<a name="SpinalNode"></a>

## SpinalNode ⇐ <code>Model</code>
<p>Node of a graph.</p>

**Kind**: global class  
**Extends**: <code>Model</code>  
**Template**: T extends spinal.Model = ElementType  

* [SpinalNode](#SpinalNode) ⇐ <code>Model</code>
    * [new SpinalNode([name], [type], [element])](#new_SpinalNode_new)
    * [.getId()](#SpinalNode+getId) ⇒ <code>spinal.Str</code>
    * [.getName()](#SpinalNode+getName) ⇒ <code>spinal.Str</code>
    * [.getType()](#SpinalNode+getType) ⇒ <code>spinal.Str</code>
    * [.getElement()](#SpinalNode+getElement) ⇒ <code>Promise.&lt;T&gt;</code>
    * [.getChildrenIds()](#SpinalNode+getChildrenIds) ⇒ <code>Array.&lt;string&gt;</code>
    * [.getNbChildren()](#SpinalNode+getNbChildren) ⇒ <code>number</code>
    * [.addContextId(id)](#SpinalNode+addContextId)
    * [.getContextIds()](#SpinalNode+getContextIds) ⇒ <code>Array.&lt;string&gt;</code>
    * [.belongsToContext(context)](#SpinalNode+belongsToContext) ⇒ <code>boolean</code>
    * [.hasRelation(relationName, relationType)](#SpinalNode+hasRelation) ⇒ <code>boolean</code>
    * [.hasRelations(relationNames, relationType)](#SpinalNode+hasRelations) ⇒ <code>boolean</code>
    * [.getRelationNames()](#SpinalNode+getRelationNames) ⇒ <code>Array.&lt;string&gt;</code>
    * [.addChild(child, relationName, relationType)](#SpinalNode+addChild) ⇒ [<code>Promise.&lt;SpinalNode&gt;</code>](#SpinalNode)
    * [.addChildInContext(child, relationName, relationType, context)](#SpinalNode+addChildInContext) ⇒ [<code>Promise.&lt;SpinalNode&gt;</code>](#SpinalNode)
    * [.removeChild(node, relationName, relationType)](#SpinalNode+removeChild) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.removeChildren(nodes, relationName, relationType)](#SpinalNode+removeChildren) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.removeRelation(relationName, relationType)](#SpinalNode+removeRelation) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.removeFromGraph()](#SpinalNode+removeFromGraph) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.getChild(predicate, relationName, relationType)](#SpinalNode+getChild) ⇒ <code>Promise.&lt;SpinalNode.&lt;any&gt;&gt;</code>
    * [.getChildren([relationNames])](#SpinalNode+getChildren) ⇒ <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code>
    * [.getChildrenInContext(context)](#SpinalNode+getChildrenInContext) ⇒ <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code>
    * [.getParents([relationNames])](#SpinalNode+getParents) ⇒ <code>Promise.&lt;Array.&lt;SpinalNode.&lt;any&gt;&gt;&gt;</code>
    * [.find(relationNames, predicate)](#SpinalNode+find) ⇒ <code>Promise.&lt;Array.&lt;SpinalNode.&lt;any&gt;&gt;&gt;</code>
    * [.findInContext(context, predicate)](#SpinalNode+findInContext) ⇒ <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code>
    * [.forEach(relationNames, callback)](#SpinalNode+forEach)
    * [.forEachInContext(context, callback)](#SpinalNode+forEachInContext)
    * [.map(relationNames, callback)](#SpinalNode+map) ⇒ <code>Promise.&lt;Array.&lt;any&gt;&gt;</code>
    * [.mapInContext(context, callback)](#SpinalNode+mapInContext) ⇒ <code>Promise.&lt;Array.&lt;\*&gt;&gt;</code>
    * [._getRelation(relationName, relationType)](#SpinalNode+_getRelation) ⇒ <code>SpinalRelation</code>
    * [._removeParent(relation)](#SpinalNode+_removeParent)
    * [._removeFromParents()](#SpinalNode+_removeFromParents)
    * [._addParent(relation)](#SpinalNode+_addParent)
    * [._createRelation(relationName, relationType)](#SpinalNode+_createRelation)
    * [._removeFromChildren()](#SpinalNode+_removeFromChildren) ⇒ <code>Promise.&lt;void&gt;</code>

<a name="new_SpinalNode_new"></a>

### new SpinalNode([name], [type], [element])
<p>Constructor for the SpinalNode class.</p>


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [name] | <code>string</code> | <code>&quot;\&quot;undefined\&quot;&quot;</code> | <p>Name of the node</p> |
| [type] | <code>string</code> | <code>&quot;\&quot;undefined\&quot;&quot;</code> | <p>Type of the node</p> |
| [element] | <code>spinal.Model</code> |  | <p>Element of the node</p> |

<a name="SpinalNode+getId"></a>

### spinalNode.getId() ⇒ <code>spinal.Str</code>
<p>Returns the id.</p>

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Returns**: <code>spinal.Str</code> - <p>Id of the node</p>  
<a name="SpinalNode+getName"></a>

### spinalNode.getName() ⇒ <code>spinal.Str</code>
<p>Returns the name.</p>

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Returns**: <code>spinal.Str</code> - <p>Name of the node</p>  
<a name="SpinalNode+getType"></a>

### spinalNode.getType() ⇒ <code>spinal.Str</code>
<p>Returns the type.</p>

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Returns**: <code>spinal.Str</code> - <p>Type of the node</p>  
<a name="SpinalNode+getElement"></a>

### spinalNode.getElement() ⇒ <code>Promise.&lt;T&gt;</code>
<p>Returns the element.</p>

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Returns**: <code>Promise.&lt;T&gt;</code> - <p>A promise where the parameter of the resolve method is the element</p>  
<a name="SpinalNode+getChildrenIds"></a>

### spinalNode.getChildrenIds() ⇒ <code>Array.&lt;string&gt;</code>
<p>Returns all the children ids in an array.</p>

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Returns**: <code>Array.&lt;string&gt;</code> - <p>Ids of the children</p>  
<a name="SpinalNode+getNbChildren"></a>

### spinalNode.getNbChildren() ⇒ <code>number</code>
<p>Computes and returns the number of children of the node.</p>

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Returns**: <code>number</code> - <p>The number of children</p>  
<a name="SpinalNode+addContextId"></a>

### spinalNode.addContextId(id)
<p>Adds an id to the context ids of the node.</p>

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Throws**:

- <code>TypeError</code> <p>If the id is not a string</p>


| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | <p>Id of the context</p> |

<a name="SpinalNode+getContextIds"></a>

### spinalNode.getContextIds() ⇒ <code>Array.&lt;string&gt;</code>
<p>Returns a list of the contexts the node is associated to.</p>

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Returns**: <code>Array.&lt;string&gt;</code> - <p>An array of ids of the associated contexts</p>  
<a name="SpinalNode+belongsToContext"></a>

### spinalNode.belongsToContext(context) ⇒ <code>boolean</code>
<p>Returns true if the node belongs to the context.</p>

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Returns**: <code>boolean</code> - <p>A boolean</p>  
**Throws**:

- <code>TypeError</code> <p>If context is not a SpinalContext</p>


| Param | Type | Description |
| --- | --- | --- |
| context | [<code>SpinalContext</code>](#SpinalContext) | <p>The context that might own the node</p> |

<a name="SpinalNode+hasRelation"></a>

### spinalNode.hasRelation(relationName, relationType) ⇒ <code>boolean</code>
<p>Verify if the node contains the relation name.</p>

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Returns**: <code>boolean</code> - <p>Return true is the relation is contained in the node and false otherwise.</p>  
**Throws**:

- <code>TypeError</code> <p>If the relation name is not a string</p>
- <code>Error</code> <p>If the relation type doesn't exist</p>


| Param | Type | Description |
| --- | --- | --- |
| relationName | <code>string</code> | <p>Name of the relation</p> |
| relationType | <code>string</code> | <p>Type of the relation</p> |

<a name="SpinalNode+hasRelations"></a>

### spinalNode.hasRelations(relationNames, relationType) ⇒ <code>boolean</code>
<p>Verify if the node contains all the relation names.</p>

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Returns**: <code>boolean</code> - <p>Return true if the node contains
all the relations in relationNames,false otherwise.</p>  
**Throws**:

- <code>TypeError</code> <p>If the relation names are not in an array</p>
- <code>TypeError</code> <p>If one of the relation names is not a string</p>
- <code>Error</code> <p>If the relation type doesn't exist</p>


| Param | Type | Description |
| --- | --- | --- |
| relationNames | <code>Array.&lt;string&gt;</code> | <p>Array containing all the relation name</p> |
| relationType | <code>string</code> | <p>Type of the relations</p> |

<a name="SpinalNode+getRelationNames"></a>

### spinalNode.getRelationNames() ⇒ <code>Array.&lt;string&gt;</code>
<p>Returns all the relation names of the node.</p>

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Returns**: <code>Array.&lt;string&gt;</code> - <p>The names of the relations of the node</p>  
<a name="SpinalNode+addChild"></a>

### spinalNode.addChild(child, relationName, relationType) ⇒ [<code>Promise.&lt;SpinalNode&gt;</code>](#SpinalNode)
<p>Add the node as child of the relation.</p>

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Returns**: [<code>Promise.&lt;SpinalNode&gt;</code>](#SpinalNode) - <p>The child node in a promise</p>  
**Throws**:

- <code>TypeError</code> <p>If the child is not a model</p>
- <code>TypeError</code> <p>If the relation name is not a string</p>
- <code>Error</code> <p>If the relation type is invalid</p>


| Param | Type | Description |
| --- | --- | --- |
| child | <code>T</code> \| <code>SpinalNode.&lt;T&gt;</code> | <p>Element to add as child</p> |
| relationName | <code>string</code> | <p>Name of the relation</p> |
| relationType | <code>string</code> | <p>Type of the relation</p> |

<a name="SpinalNode+addChildInContext"></a>

### spinalNode.addChildInContext(child, relationName, relationType, context) ⇒ [<code>Promise.&lt;SpinalNode&gt;</code>](#SpinalNode)
<p>Adds a child and notices the context if a new relation was created.</p>

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Returns**: [<code>Promise.&lt;SpinalNode&gt;</code>](#SpinalNode) - <p>The child node in a promise</p>  
**Throws**:

- <code>TypeError</code> <p>If the child is not a model</p>
- <code>TypeError</code> <p>If the relation name is not a string</p>
- <code>TypeError</code> <p>If the context is not a SpinalContext</p>
- <code>Error</code> <p>If the relation type is invalid</p>


| Param | Type | Description |
| --- | --- | --- |
| child | [<code>SpinalNode</code>](#SpinalNode) \| <code>Model</code> | <p>Node to add as child</p> |
| relationName | <code>string</code> | <p>Name of the relation</p> |
| relationType | <code>string</code> | <p>Type of the relation</p> |
| context | [<code>SpinalContext</code>](#SpinalContext) | <p>Context to update</p> |

<a name="SpinalNode+removeChild"></a>

### spinalNode.removeChild(node, relationName, relationType) ⇒ <code>Promise.&lt;void&gt;</code>
<p>Removes the node from the relation children.</p>

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Returns**: <code>Promise.&lt;void&gt;</code> - <p>An empty promise</p>  
**Throws**:

- <code>TypeError</code> <p>If relation name is not a string</p>
- <code>Error</code> <p>If relation type is invalid</p>
- <code>Error</code> <p>If relation doesn't exist</p>
- <code>Error</code> <p>If the child doesn't exist</p>


| Param | Type | Description |
| --- | --- | --- |
| node | [<code>SpinalNode</code>](#SpinalNode) | <p>Node to remove</p> |
| relationName | <code>string</code> | <p>Name of the relation to wich the node belongs</p> |
| relationType | <code>string</code> | <p>Type of the relation to wich the node belongs</p> |

<a name="SpinalNode+removeChildren"></a>

### spinalNode.removeChildren(nodes, relationName, relationType) ⇒ <code>Promise.&lt;void&gt;</code>
<p>Removes children in the given relation.</p>

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Returns**: <code>Promise.&lt;void&gt;</code> - <p>An empty promise</p>  
**Throws**:

- <code>TypeError</code> <p>If nodes is not an array</p>
- <code>TypeError</code> <p>If an element of nodes is not a SpinalNode</p>
- <code>TypeError</code> <p>If relation name is not a string</p>
- <code>Error</code> <p>If relation type is invalid</p>
- <code>Error</code> <p>If the relation doesn't exist</p>
- <code>Error</code> <p>If one of the nodes is not a child</p>


| Param | Type | Description |
| --- | --- | --- |
| nodes | [<code>Array.&lt;SpinalNode&gt;</code>](#SpinalNode) | <p>Nodes to delete</p> |
| relationName | <code>string</code> | <p>Name of the relation</p> |
| relationType | <code>string</code> | <p>Type of the relation</p> |

<a name="SpinalNode+removeRelation"></a>

### spinalNode.removeRelation(relationName, relationType) ⇒ <code>Promise.&lt;void&gt;</code>
<p>Removes a child relation of the node.</p>

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Returns**: <code>Promise.&lt;void&gt;</code> - <p>An empty promise</p>  
**Throws**:

- <code>TypeError</code> <p>If the relationName is not a string</p>
- <code>Error</code> <p>If the relationType is invalid</p>
- <code>Error</code> <p>If the relation doesn't exist</p>


| Param | Type | Description |
| --- | --- | --- |
| relationName | <code>string</code> | <p>Name of the relation to remove</p> |
| relationType | <code>string</code> | <p>Type of the relation to remove</p> |

<a name="SpinalNode+removeFromGraph"></a>

### spinalNode.removeFromGraph() ⇒ <code>Promise.&lt;void&gt;</code>
<p>Remove the node from the graph
i.e remove the node from all the parent relations and remove all the children relations.
This operation might delete all the sub-graph under this node.
After this operation the node can be deleted without fear.</p>

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Returns**: <code>Promise.&lt;void&gt;</code> - <p>An empty promise</p>  
<a name="SpinalNode+getChild"></a>

### spinalNode.getChild(predicate, relationName, relationType) ⇒ <code>Promise.&lt;SpinalNode.&lt;any&gt;&gt;</code>
<p>Returns the first child in the given relation for which the predicate is true.</p>

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Returns**: <code>Promise.&lt;SpinalNode.&lt;any&gt;&gt;</code> - <p>The first child for which the predicate is true or undefined</p>  
**Throws**:

- <code>TypeError</code> <p>If predicate is not a function</p>
- <code>TypeError</code> <p>If relation name is not a string</p>
- <code>Error</code> <p>If relation type is invalid</p>
- <code>Error</code> <p>If relation doesn't exist</p>


| Param | Type | Description |
| --- | --- | --- |
| predicate | <code>SpinalNodeFindPredicateFunc</code> | <p>Functions that takes a node and returns a boolean</p> |
| relationName | <code>string</code> | <p>Name of the relation</p> |
| relationType | <code>string</code> | <p>Type of the relation</p> |

<a name="SpinalNode+getChildren"></a>

### spinalNode.getChildren([relationNames]) ⇒ <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code>
<p>Returns the children of the node for the relation names.</p>

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Returns**: <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code> - <p>The children that were found</p>  
**Throws**:

- <code>TypeError</code> <p>If relationNames is neither an array, a string or omitted</p>
- <code>TypeError</code> <p>If an element of relationNames is not a string</p>


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [relationNames] | <code>Array.&lt;string&gt;</code> | <code>[]</code> | <p>Array containing the relation names of the desired children</p> |

<a name="SpinalNode+getChildrenInContext"></a>

### spinalNode.getChildrenInContext(context) ⇒ <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code>
<p>Return the children of the node that are registered in the context</p>

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Returns**: <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code> - <p>The children that were found</p>  
**Throws**:

- <code>TypeError</code> <p>If the context is not a SpinalContext</p>


| Param | Type | Description |
| --- | --- | --- |
| context | [<code>SpinalContext</code>](#SpinalContext) | <p>Context to use for the search</p> |

<a name="SpinalNode+getParents"></a>

### spinalNode.getParents([relationNames]) ⇒ <code>Promise.&lt;Array.&lt;SpinalNode.&lt;any&gt;&gt;&gt;</code>
<p>Return all parents for the relation names no matter the type of relation</p>

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Returns**: <code>Promise.&lt;Array.&lt;SpinalNode.&lt;any&gt;&gt;&gt;</code> - <p>Promise containing the parents that were found</p>  
**Throws**:

- <code>TypeError</code> <p>If the relationNames are neither an array, a string or omitted</p>
- <code>TypeError</code> <p>If an element of relationNames is not a string</p>


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [relationNames] | <code>Array.&lt;String&gt;</code> | <code>[]</code> | <p>Array containing the relation names of the desired parents</p> |

<a name="SpinalNode+find"></a>

### spinalNode.find(relationNames, predicate) ⇒ <code>Promise.&lt;Array.&lt;SpinalNode.&lt;any&gt;&gt;&gt;</code>
<p>Recursively finds all the children nodes for which the predicate is true.</p>

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Returns**: <code>Promise.&lt;Array.&lt;SpinalNode.&lt;any&gt;&gt;&gt;</code> - <p>The nodes that were found</p>  
**Throws**:

- <code>TypeError</code> <p>If the relationNames are neither an array, a string or omitted</p>
- <code>TypeError</code> <p>If an element of relationNames is not a string</p>
- <code>TypeError</code> <p>If the predicate is not a function</p>


| Param | Type | Description |
| --- | --- | --- |
| relationNames | <code>string</code> \| <code>Array.&lt;string&gt;</code> | <p>Array containing the relation names to follow</p> |
| predicate | <code>SpinalNodeFindPredicateFunc</code> | <p>Function returning true if the node needs to be returned</p> |

<a name="SpinalNode+findInContext"></a>

### spinalNode.findInContext(context, predicate) ⇒ <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code>
<p>Recursively finds all the children nodes in the context for which the predicate is true..</p>

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Returns**: <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code> - <p>The nodes that were found</p>  
**Throws**:

- <code>TypeError</code> <p>If context is not a SpinalContext</p>
- <code>TypeError</code> <p>If the predicate is not a function</p>


| Param | Type | Description |
| --- | --- | --- |
| context | [<code>SpinalContext</code>](#SpinalContext) | <p>Context to use for the search</p> |
| predicate | <code>findPredicate</code> | <p>Function returning true if the node needs to be returned</p> |

<a name="SpinalNode+forEach"></a>

### spinalNode.forEach(relationNames, callback)
<p>Recursively applies a function to all the children nodes.</p>

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Throws**:

- <code>TypeError</code> <p>If the relationNames are neither an array, a string or omitted</p>
- <code>TypeError</code> <p>If an element of relationNames is not a string</p>
- <code>TypeError</code> <p>If the callback is not a function</p>


| Param | Type | Description |
| --- | --- | --- |
| relationNames | <code>string</code> \| <code>Array.&lt;string&gt;</code> | <p>Array containing the relation names to follow</p> |
| callback | <code>SpinalNodeForEachFunc.&lt;SpinalNode.&lt;any&gt;&gt;</code> | <p>Function to apply to the nodes</p> |

<a name="SpinalNode+forEachInContext"></a>

### spinalNode.forEachInContext(context, callback)
<p>Recursively applies a function to all the children nodes in the context.</p>

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Throws**:

- <code>TypeError</code> <p>If context is not a SpinalContext</p>
- <code>TypeError</code> <p>If the callback is not a function</p>


| Param | Type | Description |
| --- | --- | --- |
| context | [<code>SpinalContext</code>](#SpinalContext) | <p>Context to use for the search</p> |
| callback | <code>forEachCallback</code> | <p>Function to apply to the nodes</p> |

<a name="SpinalNode+map"></a>

### spinalNode.map(relationNames, callback) ⇒ <code>Promise.&lt;Array.&lt;any&gt;&gt;</code>
<p>Recursively applies a function to all the children nodes and returns the results in an array.</p>

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Returns**: <code>Promise.&lt;Array.&lt;any&gt;&gt;</code> - <p>The results of the callback for each node</p>  
**Throws**:

- <code>TypeError</code> <p>If the relationNames are neither an array, a string or omitted</p>
- <code>TypeError</code> <p>If an element of relationNames is not a string</p>
- <code>TypeError</code> <p>If the callback is not a function</p>


| Param | Type | Description |
| --- | --- | --- |
| relationNames | <code>string</code> \| <code>Array.&lt;string&gt;</code> | <p>Array containing the relation names to follow</p> |
| callback | <code>SpinalNodeMapFunc</code> | <p>Function to apply to the nodes</p> |

<a name="SpinalNode+mapInContext"></a>

### spinalNode.mapInContext(context, callback) ⇒ <code>Promise.&lt;Array.&lt;\*&gt;&gt;</code>
<p>Recursively applies a function to all the children nodes in the context
and returns the results in an array.</p>

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Returns**: <code>Promise.&lt;Array.&lt;\*&gt;&gt;</code> - <p>The results of the callback for each node</p>  
**Throws**:

- <code>TypeError</code> <p>If context is not a SpinalContext</p>
- <code>TypeError</code> <p>If the callback is not a function</p>


| Param | Type | Description |
| --- | --- | --- |
| context | [<code>SpinalContext</code>](#SpinalContext) | <p>Context to use for the search</p> |
| callback | <code>function</code> | <p>Function to apply to the nodes</p> |

<a name="SpinalNode+_getRelation"></a>

### spinalNode.\_getRelation(relationName, relationType) ⇒ <code>SpinalRelation</code>
<p>Return the relation corresponding.</p>

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Returns**: <code>SpinalRelation</code> - <p>The relation corresponding</p>  
**Access**: protected  

| Param | Type | Description |
| --- | --- | --- |
| relationName | <code>string</code> | <p>Name of the relation</p> |
| relationType | <code>string</code> | <p>Type of the relation</p> |

<a name="SpinalNode+_removeParent"></a>

### spinalNode.\_removeParent(relation)
<p>Removes a parent relation of the node.</p>

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Access**: protected  

| Param | Type | Description |
| --- | --- | --- |
| relation | <code>AnySpinalRelation</code> | <p>Relation to remove</p> |

<a name="SpinalNode+_removeFromParents"></a>

### spinalNode.\_removeFromParents()
<p>Removes the node from all parent relation the property parents.</p>

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Access**: protected  
<a name="SpinalNode+_addParent"></a>

### spinalNode.\_addParent(relation)
<p>Adds the relation as parent of the node.</p>

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Access**: protected  

| Param | Type | Description |
| --- | --- | --- |
| relation | <code>AnySpinalRelation</code> | <p>Parent relation</p> |

<a name="SpinalNode+_createRelation"></a>

### spinalNode.\_createRelation(relationName, relationType)
<p>Create a new relation for this node.</p>

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Access**: protected  

| Param | Type | Description |
| --- | --- | --- |
| relationName | <code>string</code> | <p>Name of the relation</p> |
| relationType | <code>string</code> | <p>Type of the relation</p> |

<a name="SpinalNode+_removeFromChildren"></a>

### spinalNode.\_removeFromChildren() ⇒ <code>Promise.&lt;void&gt;</code>
<p>Remove all children relation from the graph.</p>

**Kind**: instance method of [<code>SpinalNode</code>](#SpinalNode)  
**Returns**: <code>Promise.&lt;void&gt;</code> - <p>An empty promise</p>  
**Access**: protected  
<a name="BaseSpinalRelation"></a>

## *BaseSpinalRelation ⇐ <code>Model</code>*
<p>Base for all relation in a SpinalGraph.</p>

**Kind**: global abstract class  
**Extends**: <code>Model</code>  
**Properties**

| Name | Type |
| --- | --- |
| name | <code>spinal.Str</code> | 
| id | <code>spinal.Str</code> | 
| parent | [<code>SpinalNodePointer.&lt;SpinalNode&gt;</code>](#SpinalNode) | 
| contextIds | <code>SpinalMap.&lt;spinal.Val&gt;</code> | 


* *[BaseSpinalRelation](#BaseSpinalRelation) ⇐ <code>Model</code>*
    * *[new BaseSpinalRelation(parent, name)](#new_BaseSpinalRelation_new)*
    * *[.getId()](#BaseSpinalRelation+getId) ⇒ <code>spinal.Str</code>*
    * *[.getName()](#BaseSpinalRelation+getName) ⇒ <code>spinal.Str</code>*
    * *[.getParent()](#BaseSpinalRelation+getParent) ⇒ <code>Promise.&lt;SpinalNode.&lt;spinal.Model&gt;&gt;</code>*
    * *[.addContextId(id)](#BaseSpinalRelation+addContextId)*
    * *[.getContextIds()](#BaseSpinalRelation+getContextIds) ⇒ <code>Array.&lt;string&gt;</code>*
    * *[.belongsToContext(context)](#BaseSpinalRelation+belongsToContext) ⇒ <code>boolean</code>*
    * *[.removeChildren([nodesToDelete])](#BaseSpinalRelation+removeChildren) ⇒ <code>Promise.&lt;void&gt;</code>*
    * *[.removeFromGraph()](#BaseSpinalRelation+removeFromGraph) ⇒ <code>Promise.&lt;void&gt;</code>*

<a name="new_BaseSpinalRelation_new"></a>

### *new BaseSpinalRelation(parent, name)*
<p>Constructor for the BaseSpinalRelation class.</p>


| Param | Type | Description |
| --- | --- | --- |
| parent | <code>SpinalNode.&lt;spinal.Model&gt;</code> | <p>Parent of the relation</p> |
| name | <code>string</code> | <p>Name of the relation</p> |

<a name="BaseSpinalRelation+getId"></a>

### *baseSpinalRelation.getId() ⇒ <code>spinal.Str</code>*
<p>Shortcut to id.</p>

**Kind**: instance method of [<code>BaseSpinalRelation</code>](#BaseSpinalRelation)  
**Returns**: <code>spinal.Str</code> - <p>Id of the relation</p>  
<a name="BaseSpinalRelation+getName"></a>

### *baseSpinalRelation.getName() ⇒ <code>spinal.Str</code>*
<p>Returns the name of the relation.</p>

**Kind**: instance method of [<code>BaseSpinalRelation</code>](#BaseSpinalRelation)  
**Returns**: <code>spinal.Str</code> - <p>Name of the relation</p>  
<a name="BaseSpinalRelation+getParent"></a>

### *baseSpinalRelation.getParent() ⇒ <code>Promise.&lt;SpinalNode.&lt;spinal.Model&gt;&gt;</code>*
<p>Returns the parent of the relation.</p>

**Kind**: instance method of [<code>BaseSpinalRelation</code>](#BaseSpinalRelation)  
**Returns**: <code>Promise.&lt;SpinalNode.&lt;spinal.Model&gt;&gt;</code> - <p>Returns a promise where the resolve is the parent</p>  
<a name="BaseSpinalRelation+addContextId"></a>

### *baseSpinalRelation.addContextId(id)*
<p>Adds an id to the context ids of the relation.</p>

**Kind**: instance method of [<code>BaseSpinalRelation</code>](#BaseSpinalRelation)  
**Throws**:

- <code>TypeError</code> <p>If the id is not a string</p>


| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | <p>Id of the context</p> |

<a name="BaseSpinalRelation+getContextIds"></a>

### *baseSpinalRelation.getContextIds() ⇒ <code>Array.&lt;string&gt;</code>*
<p>Returns a list of the contexts the relation is associated to.</p>

**Kind**: instance method of [<code>BaseSpinalRelation</code>](#BaseSpinalRelation)  
**Returns**: <code>Array.&lt;string&gt;</code> - <p>A list of ids of the associated contexts</p>  
<a name="BaseSpinalRelation+belongsToContext"></a>

### *baseSpinalRelation.belongsToContext(context) ⇒ <code>boolean</code>*
<p>Returns true if the relation belongs to the context.</p>

**Kind**: instance method of [<code>BaseSpinalRelation</code>](#BaseSpinalRelation)  
**Returns**: <code>boolean</code> - <p>A boolean</p>  
**Throws**:

- <code>TypeError</code> <p>If the context is not a SpinalContext</p>


| Param | Type | Description |
| --- | --- | --- |
| context | <code>SpinalContext.&lt;T&gt;</code> | <p>The context that might own the node</p> |

<a name="BaseSpinalRelation+removeChildren"></a>

### *baseSpinalRelation.removeChildren([nodesToDelete]) ⇒ <code>Promise.&lt;void&gt;</code>*
<p>Removes children from the relation.</p>

**Kind**: instance method of [<code>BaseSpinalRelation</code>](#BaseSpinalRelation)  
**Returns**: <code>Promise.&lt;void&gt;</code> - <p>An empty promise</p>  
**Throws**:

- <code>TypeError</code> <p>If nodes is not an array or omitted</p>
- <code>Error</code> <p>If one of the nodes is not a child</p>


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [nodesToDelete] | <code>Array.&lt;SpinalNode.&lt;spinal.Model&gt;&gt;</code> | <code>[]</code> | <p>Childs to remove</p> |

<a name="BaseSpinalRelation+removeFromGraph"></a>

### *baseSpinalRelation.removeFromGraph() ⇒ <code>Promise.&lt;void&gt;</code>*
<p>Removes the relation from the graph.</p>

**Kind**: instance method of [<code>BaseSpinalRelation</code>](#BaseSpinalRelation)  
**Returns**: <code>Promise.&lt;void&gt;</code> - <p>An empty promise</p>  
<a name="SpinalRelationLstPtr"></a>

## SpinalRelationLstPtr ⇐ [<code>BaseSpinalRelation</code>](#BaseSpinalRelation)
<p>Relation where the children are in Lst of Ptr.</p>

**Kind**: global class  
**Extends**: [<code>BaseSpinalRelation</code>](#BaseSpinalRelation)  
**Properties**

| Name | Type |
| --- | --- |
| name | <code>spinal.Str</code> | 
| id | <code>spinal.Str</code> | 
| parent | [<code>SpinalNodePointer.&lt;SpinalNode&gt;</code>](#SpinalNode) | 
| contextIds | <code>SpinalMap.&lt;spinal.Val&gt;</code> | 
| children | <code>spinal.Lst.&lt;SpinalNodePointer.&lt;SpinalNode&gt;&gt;</code> | 


* [SpinalRelationLstPtr](#SpinalRelationLstPtr) ⇐ [<code>BaseSpinalRelation</code>](#BaseSpinalRelation)
    * [new SpinalRelationLstPtr(parent, name)](#new_SpinalRelationLstPtr_new)
    * [.getChildrenIds()](#SpinalRelationLstPtr+getChildrenIds) ⇒ <code>Array.&lt;string&gt;</code>
    * [.getNbChildren()](#SpinalRelationLstPtr+getNbChildren) ⇒ <code>number</code>
    * [.getChildren()](#SpinalRelationLstPtr+getChildren) ⇒ <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code>
    * [.getChildrenInContext()](#SpinalRelationLstPtr+getChildrenInContext) ⇒ <code>Promise.&lt;Array.&lt;SpinalNodeAny&gt;&gt;</code>
    * [.getType()](#SpinalRelationLstPtr+getType) ⇒ <code>string</code>
    * [.addChild(node)](#SpinalRelationLstPtr+addChild) ⇒ <code>Promise.&lt;SpinalNode.&lt;T&gt;&gt;</code>
    * [.removeChild(node)](#SpinalRelationLstPtr+removeChild) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.getId()](#BaseSpinalRelation+getId) ⇒ <code>spinal.Str</code>
    * [.getName()](#BaseSpinalRelation+getName) ⇒ <code>spinal.Str</code>
    * [.getParent()](#BaseSpinalRelation+getParent) ⇒ <code>Promise.&lt;SpinalNode.&lt;spinal.Model&gt;&gt;</code>
    * [.addContextId(id)](#BaseSpinalRelation+addContextId)
    * [.getContextIds()](#BaseSpinalRelation+getContextIds) ⇒ <code>Array.&lt;string&gt;</code>
    * [.belongsToContext(context)](#BaseSpinalRelation+belongsToContext) ⇒ <code>boolean</code>
    * [.removeChildren([nodesToDelete])](#BaseSpinalRelation+removeChildren) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.removeFromGraph()](#BaseSpinalRelation+removeFromGraph) ⇒ <code>Promise.&lt;void&gt;</code>

<a name="new_SpinalRelationLstPtr_new"></a>

### new SpinalRelationLstPtr(parent, name)
<p>Constructor for the SpinalRelationLstPtr class.</p>


| Param | Type | Description |
| --- | --- | --- |
| parent | <code>SpinalNodeAny</code> | <p>Parent of the relation</p> |
| name | <code>string</code> | <p>Name of the relation</p> |

<a name="SpinalRelationLstPtr+getChildrenIds"></a>

### spinalRelationLstPtr.getChildrenIds() ⇒ <code>Array.&lt;string&gt;</code>
<p>Retrieves all the ids of the children of the relation and return them inside an array.</p>

**Kind**: instance method of [<code>SpinalRelationLstPtr</code>](#SpinalRelationLstPtr)  
**Returns**: <code>Array.&lt;string&gt;</code> - <p>Array containing all the children ids of the relation</p>  
<a name="SpinalRelationLstPtr+getNbChildren"></a>

### spinalRelationLstPtr.getNbChildren() ⇒ <code>number</code>
<p>returns the number of children of the relation.</p>

**Kind**: instance method of [<code>SpinalRelationLstPtr</code>](#SpinalRelationLstPtr)  
<a name="SpinalRelationLstPtr+getChildren"></a>

### spinalRelationLstPtr.getChildren() ⇒ <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code>
<p>Return all the children of the relation.</p>

**Kind**: instance method of [<code>SpinalRelationLstPtr</code>](#SpinalRelationLstPtr)  
**Returns**: <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code> - <p>The children of the relation</p>  
<a name="SpinalRelationLstPtr+getChildrenInContext"></a>

### spinalRelationLstPtr.getChildrenInContext() ⇒ <code>Promise.&lt;Array.&lt;SpinalNodeAny&gt;&gt;</code>
<p>Return all the children of the relation associated to a certain context.</p>

**Kind**: instance method of [<code>SpinalRelationLstPtr</code>](#SpinalRelationLstPtr)  
**Returns**: <code>Promise.&lt;Array.&lt;SpinalNodeAny&gt;&gt;</code> - <p>The children of the relation</p>  
**Throws**:

- <code>TypeError</code> <p>If the context is not a SpinalContext</p>

<a name="SpinalRelationLstPtr+getType"></a>

### spinalRelationLstPtr.getType() ⇒ <code>string</code>
<p>Returns the type of the relation.</p>

**Kind**: instance method of [<code>SpinalRelationLstPtr</code>](#SpinalRelationLstPtr)  
**Returns**: <code>string</code> - <p>Type of the relation</p>  
<a name="SpinalRelationLstPtr+addChild"></a>

### spinalRelationLstPtr.addChild(node) ⇒ <code>Promise.&lt;SpinalNode.&lt;T&gt;&gt;</code>
<p>Adds a child to the relation.</p>

**Kind**: instance method of [<code>SpinalRelationLstPtr</code>](#SpinalRelationLstPtr)  
**Returns**: <code>Promise.&lt;SpinalNode.&lt;T&gt;&gt;</code> - <p>Promise containing the node that was added</p>  
**Throws**:

- <code>TypeError</code> <p>If the node is not a Model</p>
- <code>Error</code> <p>If the node is already a child of the relation</p>

**Template**: T extends spinal.Model = Node Element Type  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>T</code> \| <code>SpinalNode.&lt;T&gt;</code> | <p>Node or model to add</p> |

<a name="SpinalRelationLstPtr+removeChild"></a>

### spinalRelationLstPtr.removeChild(node) ⇒ <code>Promise.&lt;void&gt;</code>
<p>Removes a child from the relation.</p>

**Kind**: instance method of [<code>SpinalRelationLstPtr</code>](#SpinalRelationLstPtr)  
**Returns**: <code>Promise.&lt;void&gt;</code> - <p>An empty promise</p>  
**Throws**:

- <code>Error</code> <p>If the given node is not a child</p>


| Param | Type | Description |
| --- | --- | --- |
| node | <code>SpinalNodeAny</code> | <p>Child to remove</p> |

<a name="BaseSpinalRelation+getId"></a>

### spinalRelationLstPtr.getId() ⇒ <code>spinal.Str</code>
<p>Shortcut to id.</p>

**Kind**: instance method of [<code>SpinalRelationLstPtr</code>](#SpinalRelationLstPtr)  
**Returns**: <code>spinal.Str</code> - <p>Id of the relation</p>  
<a name="BaseSpinalRelation+getName"></a>

### spinalRelationLstPtr.getName() ⇒ <code>spinal.Str</code>
<p>Returns the name of the relation.</p>

**Kind**: instance method of [<code>SpinalRelationLstPtr</code>](#SpinalRelationLstPtr)  
**Returns**: <code>spinal.Str</code> - <p>Name of the relation</p>  
<a name="BaseSpinalRelation+getParent"></a>

### spinalRelationLstPtr.getParent() ⇒ <code>Promise.&lt;SpinalNode.&lt;spinal.Model&gt;&gt;</code>
<p>Returns the parent of the relation.</p>

**Kind**: instance method of [<code>SpinalRelationLstPtr</code>](#SpinalRelationLstPtr)  
**Returns**: <code>Promise.&lt;SpinalNode.&lt;spinal.Model&gt;&gt;</code> - <p>Returns a promise where the resolve is the parent</p>  
<a name="BaseSpinalRelation+addContextId"></a>

### spinalRelationLstPtr.addContextId(id)
<p>Adds an id to the context ids of the relation.</p>

**Kind**: instance method of [<code>SpinalRelationLstPtr</code>](#SpinalRelationLstPtr)  
**Throws**:

- <code>TypeError</code> <p>If the id is not a string</p>


| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | <p>Id of the context</p> |

<a name="BaseSpinalRelation+getContextIds"></a>

### spinalRelationLstPtr.getContextIds() ⇒ <code>Array.&lt;string&gt;</code>
<p>Returns a list of the contexts the relation is associated to.</p>

**Kind**: instance method of [<code>SpinalRelationLstPtr</code>](#SpinalRelationLstPtr)  
**Returns**: <code>Array.&lt;string&gt;</code> - <p>A list of ids of the associated contexts</p>  
<a name="BaseSpinalRelation+belongsToContext"></a>

### spinalRelationLstPtr.belongsToContext(context) ⇒ <code>boolean</code>
<p>Returns true if the relation belongs to the context.</p>

**Kind**: instance method of [<code>SpinalRelationLstPtr</code>](#SpinalRelationLstPtr)  
**Returns**: <code>boolean</code> - <p>A boolean</p>  
**Throws**:

- <code>TypeError</code> <p>If the context is not a SpinalContext</p>


| Param | Type | Description |
| --- | --- | --- |
| context | <code>SpinalContext.&lt;T&gt;</code> | <p>The context that might own the node</p> |

<a name="BaseSpinalRelation+removeChildren"></a>

### spinalRelationLstPtr.removeChildren([nodesToDelete]) ⇒ <code>Promise.&lt;void&gt;</code>
<p>Removes children from the relation.</p>

**Kind**: instance method of [<code>SpinalRelationLstPtr</code>](#SpinalRelationLstPtr)  
**Returns**: <code>Promise.&lt;void&gt;</code> - <p>An empty promise</p>  
**Throws**:

- <code>TypeError</code> <p>If nodes is not an array or omitted</p>
- <code>Error</code> <p>If one of the nodes is not a child</p>


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [nodesToDelete] | <code>Array.&lt;SpinalNode.&lt;spinal.Model&gt;&gt;</code> | <code>[]</code> | <p>Childs to remove</p> |

<a name="BaseSpinalRelation+removeFromGraph"></a>

### spinalRelationLstPtr.removeFromGraph() ⇒ <code>Promise.&lt;void&gt;</code>
<p>Removes the relation from the graph.</p>

**Kind**: instance method of [<code>SpinalRelationLstPtr</code>](#SpinalRelationLstPtr)  
**Returns**: <code>Promise.&lt;void&gt;</code> - <p>An empty promise</p>  
<a name="SpinalRelationPtrLst"></a>

## SpinalRelationPtrLst ⇐ [<code>BaseSpinalRelation</code>](#BaseSpinalRelation)
**Kind**: global class  
**Extends**: [<code>BaseSpinalRelation</code>](#BaseSpinalRelation)  
**Properties**

| Name | Type |
| --- | --- |
| name | <code>spinal.Str</code> | 
| id | <code>spinal.Str</code> | 
| parent | <code>SpinalNodePointer.&lt;SpinalNodeAny&gt;</code> | 
| contextIds | <code>SpinalMap.&lt;spinal.Val&gt;</code> | 
| children | <code>SpinalRelationPtrLstNodePointer</code> | 


* [SpinalRelationPtrLst](#SpinalRelationPtrLst) ⇐ [<code>BaseSpinalRelation</code>](#BaseSpinalRelation)
    * [new SpinalRelationPtrLst()](#new_SpinalRelationPtrLst_new)
    * [new SpinalRelationPtrLst(parent, name)](#new_SpinalRelationPtrLst_new)
    * [.getChildrenIds()](#SpinalRelationPtrLst+getChildrenIds) ⇒ <code>Array.&lt;String&gt;</code>
    * [.getNbChildren()](#SpinalRelationPtrLst+getNbChildren) ⇒ <code>number</code>
    * [.getChildren()](#SpinalRelationPtrLst+getChildren) ⇒ <code>Promise.&lt;Array.&lt;SpinalNodeAny&gt;&gt;</code>
    * [.getChildrenInContext(context)](#SpinalRelationPtrLst+getChildrenInContext) ⇒ <code>Promise.&lt;Array.&lt;SpinalNodeAny&gt;&gt;</code>
    * [.getType()](#SpinalRelationPtrLst+getType) ⇒ <code>string</code>
    * [.addChild(node)](#SpinalRelationPtrLst+addChild) ⇒ <code>Promise.&lt;SpinalNode.&lt;T&gt;&gt;</code>
    * [.removeChild(node)](#SpinalRelationPtrLst+removeChild) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.getId()](#BaseSpinalRelation+getId) ⇒ <code>spinal.Str</code>
    * [.getName()](#BaseSpinalRelation+getName) ⇒ <code>spinal.Str</code>
    * [.getParent()](#BaseSpinalRelation+getParent) ⇒ <code>Promise.&lt;SpinalNode.&lt;spinal.Model&gt;&gt;</code>
    * [.addContextId(id)](#BaseSpinalRelation+addContextId)
    * [.getContextIds()](#BaseSpinalRelation+getContextIds) ⇒ <code>Array.&lt;string&gt;</code>
    * [.belongsToContext(context)](#BaseSpinalRelation+belongsToContext) ⇒ <code>boolean</code>
    * [.removeChildren([nodesToDelete])](#BaseSpinalRelation+removeChildren) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.removeFromGraph()](#BaseSpinalRelation+removeFromGraph) ⇒ <code>Promise.&lt;void&gt;</code>

<a name="new_SpinalRelationPtrLst_new"></a>

### new SpinalRelationPtrLst()
<p>Relation where the children are in Ptr to a Lst.</p>

<a name="new_SpinalRelationPtrLst_new"></a>

### new SpinalRelationPtrLst(parent, name)
<p>Constructor for the SpinalRelationPtrLst class.</p>

**Throws**:

- <code>TypeError</code> <p>If the parent is not a node</p>
- <code>TypeError</code> <p>If the name is not a string</p>


| Param | Type | Description |
| --- | --- | --- |
| parent | [<code>SpinalNode</code>](#SpinalNode) | <p>Parent of the relation</p> |
| name | <code>string</code> | <p>Name of the relation</p> |

<a name="SpinalRelationPtrLst+getChildrenIds"></a>

### spinalRelationPtrLst.getChildrenIds() ⇒ <code>Array.&lt;String&gt;</code>
<p>Retrieves all the ids of the children of the relation and return them inside an array.</p>

**Kind**: instance method of [<code>SpinalRelationPtrLst</code>](#SpinalRelationPtrLst)  
**Returns**: <code>Array.&lt;String&gt;</code> - <p>Array containing all the children ids of the relation</p>  
<a name="SpinalRelationPtrLst+getNbChildren"></a>

### spinalRelationPtrLst.getNbChildren() ⇒ <code>number</code>
<p>returns the number of children of the relation.</p>

**Kind**: instance method of [<code>SpinalRelationPtrLst</code>](#SpinalRelationPtrLst)  
<a name="SpinalRelationPtrLst+getChildren"></a>

### spinalRelationPtrLst.getChildren() ⇒ <code>Promise.&lt;Array.&lt;SpinalNodeAny&gt;&gt;</code>
<p>Return all the children of the relation.</p>

**Kind**: instance method of [<code>SpinalRelationPtrLst</code>](#SpinalRelationPtrLst)  
**Returns**: <code>Promise.&lt;Array.&lt;SpinalNodeAny&gt;&gt;</code> - <p>The children of the relation</p>  
<a name="SpinalRelationPtrLst+getChildrenInContext"></a>

### spinalRelationPtrLst.getChildrenInContext(context) ⇒ <code>Promise.&lt;Array.&lt;SpinalNodeAny&gt;&gt;</code>
<p>Return all the children of the relation associated to a certain context.</p>

**Kind**: instance method of [<code>SpinalRelationPtrLst</code>](#SpinalRelationPtrLst)  
**Returns**: <code>Promise.&lt;Array.&lt;SpinalNodeAny&gt;&gt;</code> - <p>The children associated to the context</p>  
**Throws**:

- <code>TypeError</code> <p>If the context is not a SpinalContext</p>


| Param | Type | Description |
| --- | --- | --- |
| context | [<code>SpinalContext</code>](#SpinalContext) | <p>Context to use for the search</p> |

<a name="SpinalRelationPtrLst+getType"></a>

### spinalRelationPtrLst.getType() ⇒ <code>string</code>
<p>Returns the type of the relation.</p>

**Kind**: instance method of [<code>SpinalRelationPtrLst</code>](#SpinalRelationPtrLst)  
**Returns**: <code>string</code> - <p>Type of the relation</p>  
<a name="SpinalRelationPtrLst+addChild"></a>

### spinalRelationPtrLst.addChild(node) ⇒ <code>Promise.&lt;SpinalNode.&lt;T&gt;&gt;</code>
<p>Adds a child to the relation.</p>

**Kind**: instance method of [<code>SpinalRelationPtrLst</code>](#SpinalRelationPtrLst)  
**Returns**: <code>Promise.&lt;SpinalNode.&lt;T&gt;&gt;</code> - <p>Promise containing the node that was added</p>  
**Throws**:

- <code>TypeError</code> <p>If the node is not a Model</p>
- <code>Error</code> <p>If the node is already a child of the relation</p>

**Template**: T extends spinal.Model = Node Element Type  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>T</code> \| <code>SpinalNode.&lt;T&gt;</code> | <p>Node or model to add</p> |

<a name="SpinalRelationPtrLst+removeChild"></a>

### spinalRelationPtrLst.removeChild(node) ⇒ <code>Promise.&lt;void&gt;</code>
<p>Removes a child from the relation.</p>

**Kind**: instance method of [<code>SpinalRelationPtrLst</code>](#SpinalRelationPtrLst)  
**Returns**: <code>Promise.&lt;void&gt;</code> - <p>An empty promise</p>  
**Throws**:

- <code>Error</code> <p>If the given node is not a child</p>


| Param | Type | Description |
| --- | --- | --- |
| node | <code>SpinalNodeAny</code> | <p>Child to remove</p> |

<a name="BaseSpinalRelation+getId"></a>

### spinalRelationPtrLst.getId() ⇒ <code>spinal.Str</code>
<p>Shortcut to id.</p>

**Kind**: instance method of [<code>SpinalRelationPtrLst</code>](#SpinalRelationPtrLst)  
**Returns**: <code>spinal.Str</code> - <p>Id of the relation</p>  
<a name="BaseSpinalRelation+getName"></a>

### spinalRelationPtrLst.getName() ⇒ <code>spinal.Str</code>
<p>Returns the name of the relation.</p>

**Kind**: instance method of [<code>SpinalRelationPtrLst</code>](#SpinalRelationPtrLst)  
**Returns**: <code>spinal.Str</code> - <p>Name of the relation</p>  
<a name="BaseSpinalRelation+getParent"></a>

### spinalRelationPtrLst.getParent() ⇒ <code>Promise.&lt;SpinalNode.&lt;spinal.Model&gt;&gt;</code>
<p>Returns the parent of the relation.</p>

**Kind**: instance method of [<code>SpinalRelationPtrLst</code>](#SpinalRelationPtrLst)  
**Returns**: <code>Promise.&lt;SpinalNode.&lt;spinal.Model&gt;&gt;</code> - <p>Returns a promise where the resolve is the parent</p>  
<a name="BaseSpinalRelation+addContextId"></a>

### spinalRelationPtrLst.addContextId(id)
<p>Adds an id to the context ids of the relation.</p>

**Kind**: instance method of [<code>SpinalRelationPtrLst</code>](#SpinalRelationPtrLst)  
**Throws**:

- <code>TypeError</code> <p>If the id is not a string</p>


| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | <p>Id of the context</p> |

<a name="BaseSpinalRelation+getContextIds"></a>

### spinalRelationPtrLst.getContextIds() ⇒ <code>Array.&lt;string&gt;</code>
<p>Returns a list of the contexts the relation is associated to.</p>

**Kind**: instance method of [<code>SpinalRelationPtrLst</code>](#SpinalRelationPtrLst)  
**Returns**: <code>Array.&lt;string&gt;</code> - <p>A list of ids of the associated contexts</p>  
<a name="BaseSpinalRelation+belongsToContext"></a>

### spinalRelationPtrLst.belongsToContext(context) ⇒ <code>boolean</code>
<p>Returns true if the relation belongs to the context.</p>

**Kind**: instance method of [<code>SpinalRelationPtrLst</code>](#SpinalRelationPtrLst)  
**Returns**: <code>boolean</code> - <p>A boolean</p>  
**Throws**:

- <code>TypeError</code> <p>If the context is not a SpinalContext</p>


| Param | Type | Description |
| --- | --- | --- |
| context | <code>SpinalContext.&lt;T&gt;</code> | <p>The context that might own the node</p> |

<a name="BaseSpinalRelation+removeChildren"></a>

### spinalRelationPtrLst.removeChildren([nodesToDelete]) ⇒ <code>Promise.&lt;void&gt;</code>
<p>Removes children from the relation.</p>

**Kind**: instance method of [<code>SpinalRelationPtrLst</code>](#SpinalRelationPtrLst)  
**Overrides**: [<code>removeChildren</code>](#BaseSpinalRelation+removeChildren)  
**Returns**: <code>Promise.&lt;void&gt;</code> - <p>An empty promise</p>  
**Throws**:

- <code>TypeError</code> <p>If nodes is not an array or omitted</p>
- <code>Error</code> <p>If one of the nodes is not a child</p>


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [nodesToDelete] | <code>Array.&lt;SpinalNode.&lt;spinal.Model&gt;&gt;</code> | <code>[]</code> | <p>Childs to remove</p> |

<a name="BaseSpinalRelation+removeFromGraph"></a>

### spinalRelationPtrLst.removeFromGraph() ⇒ <code>Promise.&lt;void&gt;</code>
<p>Removes the relation from the graph.</p>

**Kind**: instance method of [<code>SpinalRelationPtrLst</code>](#SpinalRelationPtrLst)  
**Returns**: <code>Promise.&lt;void&gt;</code> - <p>An empty promise</p>  
<a name="SpinalRelationPtrLst"></a>

## SpinalRelationPtrLst
**Kind**: global class  

* [SpinalRelationPtrLst](#SpinalRelationPtrLst)
    * [new SpinalRelationPtrLst()](#new_SpinalRelationPtrLst_new)
    * [new SpinalRelationPtrLst(parent, name)](#new_SpinalRelationPtrLst_new)
    * [.getChildrenIds()](#SpinalRelationPtrLst+getChildrenIds) ⇒ <code>Array.&lt;String&gt;</code>
    * [.getNbChildren()](#SpinalRelationPtrLst+getNbChildren) ⇒ <code>number</code>
    * [.getChildren()](#SpinalRelationPtrLst+getChildren) ⇒ <code>Promise.&lt;Array.&lt;SpinalNodeAny&gt;&gt;</code>
    * [.getChildrenInContext(context)](#SpinalRelationPtrLst+getChildrenInContext) ⇒ <code>Promise.&lt;Array.&lt;SpinalNodeAny&gt;&gt;</code>
    * [.getType()](#SpinalRelationPtrLst+getType) ⇒ <code>string</code>
    * [.addChild(node)](#SpinalRelationPtrLst+addChild) ⇒ <code>Promise.&lt;SpinalNode.&lt;T&gt;&gt;</code>
    * [.removeChild(node)](#SpinalRelationPtrLst+removeChild) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.getId()](#BaseSpinalRelation+getId) ⇒ <code>spinal.Str</code>
    * [.getName()](#BaseSpinalRelation+getName) ⇒ <code>spinal.Str</code>
    * [.getParent()](#BaseSpinalRelation+getParent) ⇒ <code>Promise.&lt;SpinalNode.&lt;spinal.Model&gt;&gt;</code>
    * [.addContextId(id)](#BaseSpinalRelation+addContextId)
    * [.getContextIds()](#BaseSpinalRelation+getContextIds) ⇒ <code>Array.&lt;string&gt;</code>
    * [.belongsToContext(context)](#BaseSpinalRelation+belongsToContext) ⇒ <code>boolean</code>
    * [.removeChildren([nodesToDelete])](#BaseSpinalRelation+removeChildren) ⇒ <code>Promise.&lt;void&gt;</code>
    * [.removeFromGraph()](#BaseSpinalRelation+removeFromGraph) ⇒ <code>Promise.&lt;void&gt;</code>

<a name="new_SpinalRelationPtrLst_new"></a>

### new SpinalRelationPtrLst()
<p>Relation where the children are in Ptr to a Lst.</p>

<a name="new_SpinalRelationPtrLst_new"></a>

### new SpinalRelationPtrLst(parent, name)
<p>Constructor for the SpinalRelationPtrLst class.</p>

**Throws**:

- <code>TypeError</code> <p>If the parent is not a node</p>
- <code>TypeError</code> <p>If the name is not a string</p>


| Param | Type | Description |
| --- | --- | --- |
| parent | [<code>SpinalNode</code>](#SpinalNode) | <p>Parent of the relation</p> |
| name | <code>string</code> | <p>Name of the relation</p> |

<a name="SpinalRelationPtrLst+getChildrenIds"></a>

### spinalRelationPtrLst.getChildrenIds() ⇒ <code>Array.&lt;String&gt;</code>
<p>Retrieves all the ids of the children of the relation and return them inside an array.</p>

**Kind**: instance method of [<code>SpinalRelationPtrLst</code>](#SpinalRelationPtrLst)  
**Returns**: <code>Array.&lt;String&gt;</code> - <p>Array containing all the children ids of the relation</p>  
<a name="SpinalRelationPtrLst+getNbChildren"></a>

### spinalRelationPtrLst.getNbChildren() ⇒ <code>number</code>
<p>returns the number of children of the relation.</p>

**Kind**: instance method of [<code>SpinalRelationPtrLst</code>](#SpinalRelationPtrLst)  
<a name="SpinalRelationPtrLst+getChildren"></a>

### spinalRelationPtrLst.getChildren() ⇒ <code>Promise.&lt;Array.&lt;SpinalNodeAny&gt;&gt;</code>
<p>Return all the children of the relation.</p>

**Kind**: instance method of [<code>SpinalRelationPtrLst</code>](#SpinalRelationPtrLst)  
**Returns**: <code>Promise.&lt;Array.&lt;SpinalNodeAny&gt;&gt;</code> - <p>The children of the relation</p>  
<a name="SpinalRelationPtrLst+getChildrenInContext"></a>

### spinalRelationPtrLst.getChildrenInContext(context) ⇒ <code>Promise.&lt;Array.&lt;SpinalNodeAny&gt;&gt;</code>
<p>Return all the children of the relation associated to a certain context.</p>

**Kind**: instance method of [<code>SpinalRelationPtrLst</code>](#SpinalRelationPtrLst)  
**Returns**: <code>Promise.&lt;Array.&lt;SpinalNodeAny&gt;&gt;</code> - <p>The children associated to the context</p>  
**Throws**:

- <code>TypeError</code> <p>If the context is not a SpinalContext</p>


| Param | Type | Description |
| --- | --- | --- |
| context | [<code>SpinalContext</code>](#SpinalContext) | <p>Context to use for the search</p> |

<a name="SpinalRelationPtrLst+getType"></a>

### spinalRelationPtrLst.getType() ⇒ <code>string</code>
<p>Returns the type of the relation.</p>

**Kind**: instance method of [<code>SpinalRelationPtrLst</code>](#SpinalRelationPtrLst)  
**Returns**: <code>string</code> - <p>Type of the relation</p>  
<a name="SpinalRelationPtrLst+addChild"></a>

### spinalRelationPtrLst.addChild(node) ⇒ <code>Promise.&lt;SpinalNode.&lt;T&gt;&gt;</code>
<p>Adds a child to the relation.</p>

**Kind**: instance method of [<code>SpinalRelationPtrLst</code>](#SpinalRelationPtrLst)  
**Returns**: <code>Promise.&lt;SpinalNode.&lt;T&gt;&gt;</code> - <p>Promise containing the node that was added</p>  
**Throws**:

- <code>TypeError</code> <p>If the node is not a Model</p>
- <code>Error</code> <p>If the node is already a child of the relation</p>

**Template**: T extends spinal.Model = Node Element Type  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>T</code> \| <code>SpinalNode.&lt;T&gt;</code> | <p>Node or model to add</p> |

<a name="SpinalRelationPtrLst+removeChild"></a>

### spinalRelationPtrLst.removeChild(node) ⇒ <code>Promise.&lt;void&gt;</code>
<p>Removes a child from the relation.</p>

**Kind**: instance method of [<code>SpinalRelationPtrLst</code>](#SpinalRelationPtrLst)  
**Returns**: <code>Promise.&lt;void&gt;</code> - <p>An empty promise</p>  
**Throws**:

- <code>Error</code> <p>If the given node is not a child</p>


| Param | Type | Description |
| --- | --- | --- |
| node | <code>SpinalNodeAny</code> | <p>Child to remove</p> |

<a name="BaseSpinalRelation+getId"></a>

### spinalRelationPtrLst.getId() ⇒ <code>spinal.Str</code>
<p>Shortcut to id.</p>

**Kind**: instance method of [<code>SpinalRelationPtrLst</code>](#SpinalRelationPtrLst)  
**Returns**: <code>spinal.Str</code> - <p>Id of the relation</p>  
<a name="BaseSpinalRelation+getName"></a>

### spinalRelationPtrLst.getName() ⇒ <code>spinal.Str</code>
<p>Returns the name of the relation.</p>

**Kind**: instance method of [<code>SpinalRelationPtrLst</code>](#SpinalRelationPtrLst)  
**Returns**: <code>spinal.Str</code> - <p>Name of the relation</p>  
<a name="BaseSpinalRelation+getParent"></a>

### spinalRelationPtrLst.getParent() ⇒ <code>Promise.&lt;SpinalNode.&lt;spinal.Model&gt;&gt;</code>
<p>Returns the parent of the relation.</p>

**Kind**: instance method of [<code>SpinalRelationPtrLst</code>](#SpinalRelationPtrLst)  
**Returns**: <code>Promise.&lt;SpinalNode.&lt;spinal.Model&gt;&gt;</code> - <p>Returns a promise where the resolve is the parent</p>  
<a name="BaseSpinalRelation+addContextId"></a>

### spinalRelationPtrLst.addContextId(id)
<p>Adds an id to the context ids of the relation.</p>

**Kind**: instance method of [<code>SpinalRelationPtrLst</code>](#SpinalRelationPtrLst)  
**Throws**:

- <code>TypeError</code> <p>If the id is not a string</p>


| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | <p>Id of the context</p> |

<a name="BaseSpinalRelation+getContextIds"></a>

### spinalRelationPtrLst.getContextIds() ⇒ <code>Array.&lt;string&gt;</code>
<p>Returns a list of the contexts the relation is associated to.</p>

**Kind**: instance method of [<code>SpinalRelationPtrLst</code>](#SpinalRelationPtrLst)  
**Returns**: <code>Array.&lt;string&gt;</code> - <p>A list of ids of the associated contexts</p>  
<a name="BaseSpinalRelation+belongsToContext"></a>

### spinalRelationPtrLst.belongsToContext(context) ⇒ <code>boolean</code>
<p>Returns true if the relation belongs to the context.</p>

**Kind**: instance method of [<code>SpinalRelationPtrLst</code>](#SpinalRelationPtrLst)  
**Returns**: <code>boolean</code> - <p>A boolean</p>  
**Throws**:

- <code>TypeError</code> <p>If the context is not a SpinalContext</p>


| Param | Type | Description |
| --- | --- | --- |
| context | <code>SpinalContext.&lt;T&gt;</code> | <p>The context that might own the node</p> |

<a name="BaseSpinalRelation+removeChildren"></a>

### spinalRelationPtrLst.removeChildren([nodesToDelete]) ⇒ <code>Promise.&lt;void&gt;</code>
<p>Removes children from the relation.</p>

**Kind**: instance method of [<code>SpinalRelationPtrLst</code>](#SpinalRelationPtrLst)  
**Overrides**: [<code>removeChildren</code>](#BaseSpinalRelation+removeChildren)  
**Returns**: <code>Promise.&lt;void&gt;</code> - <p>An empty promise</p>  
**Throws**:

- <code>TypeError</code> <p>If nodes is not an array or omitted</p>
- <code>Error</code> <p>If one of the nodes is not a child</p>


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [nodesToDelete] | <code>Array.&lt;SpinalNode.&lt;spinal.Model&gt;&gt;</code> | <code>[]</code> | <p>Childs to remove</p> |

<a name="BaseSpinalRelation+removeFromGraph"></a>

### spinalRelationPtrLst.removeFromGraph() ⇒ <code>Promise.&lt;void&gt;</code>
<p>Removes the relation from the graph.</p>

**Kind**: instance method of [<code>SpinalRelationPtrLst</code>](#SpinalRelationPtrLst)  
**Returns**: <code>Promise.&lt;void&gt;</code> - <p>An empty promise</p>  
<a name="SpinalRelationRef"></a>

## SpinalRelationRef ⇐ [<code>BaseSpinalRelation</code>](#BaseSpinalRelation)
**Kind**: global class  
**Extends**: [<code>BaseSpinalRelation</code>](#BaseSpinalRelation)  
**Properties**

| Name | Type |
| --- | --- |
| name | <code>spinal.Str</code> | 
| id | <code>spinal.Str</code> | 
| parent | [<code>SpinalNodePointer.&lt;SpinalNode&gt;</code>](#SpinalNode) | 
| contextIds | <code>SpinalMap.&lt;spinal.Val&gt;</code> | 
| children | [<code>spinal.Lst.&lt;SpinalNode&gt;</code>](#SpinalNode) | 


* [SpinalRelationRef](#SpinalRelationRef) ⇐ [<code>BaseSpinalRelation</code>](#BaseSpinalRelation)
    * [new SpinalRelationRef()](#new_SpinalRelationRef_new)
    * _instance_
        * [.getChildrenIds()](#SpinalRelationRef+getChildrenIds) ⇒ <code>Array.&lt;String&gt;</code>
        * [.getNbChildren()](#SpinalRelationRef+getNbChildren) ⇒ <code>number</code>
        * [.getChildren()](#SpinalRelationRef+getChildren) ⇒ <code>Promise.&lt;Array.&lt;SpinalNodeAny&gt;&gt;</code>
        * [.getChildrenInContext(context)](#SpinalRelationRef+getChildrenInContext) ⇒ <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code>
        * [.getType()](#SpinalRelationRef+getType) ⇒ <code>string</code>
        * [.addChild(node)](#SpinalRelationRef+addChild) ⇒ <code>Promise.&lt;SpinalNode.&lt;T&gt;&gt;</code>
        * [.removeChild(node)](#SpinalRelationRef+removeChild) ⇒ <code>Promise.&lt;void&gt;</code>
        * [.getId()](#BaseSpinalRelation+getId) ⇒ <code>spinal.Str</code>
        * [.getName()](#BaseSpinalRelation+getName) ⇒ <code>spinal.Str</code>
        * [.getParent()](#BaseSpinalRelation+getParent) ⇒ <code>Promise.&lt;SpinalNode.&lt;spinal.Model&gt;&gt;</code>
        * [.addContextId(id)](#BaseSpinalRelation+addContextId)
        * [.getContextIds()](#BaseSpinalRelation+getContextIds) ⇒ <code>Array.&lt;string&gt;</code>
        * [.belongsToContext(context)](#BaseSpinalRelation+belongsToContext) ⇒ <code>boolean</code>
        * [.removeChildren([nodesToDelete])](#BaseSpinalRelation+removeChildren) ⇒ <code>Promise.&lt;void&gt;</code>
        * [.removeFromGraph()](#BaseSpinalRelation+removeFromGraph) ⇒ <code>Promise.&lt;void&gt;</code>
    * _static_
        * [.SpinalRelationRef](#SpinalRelationRef.SpinalRelationRef)
            * [new SpinalRelationRef(parent, name)](#new_SpinalRelationRef.SpinalRelationRef_new)

<a name="new_SpinalRelationRef_new"></a>

### new SpinalRelationRef()
<p>Relation where the children are in a Lst.</p>

<a name="SpinalRelationRef+getChildrenIds"></a>

### spinalRelationRef.getChildrenIds() ⇒ <code>Array.&lt;String&gt;</code>
<p>Retrieves all the ids of the children of the relation and return them inside an array.</p>

**Kind**: instance method of [<code>SpinalRelationRef</code>](#SpinalRelationRef)  
**Returns**: <code>Array.&lt;String&gt;</code> - <p>Array containing all the children ids of the relation</p>  
<a name="SpinalRelationRef+getNbChildren"></a>

### spinalRelationRef.getNbChildren() ⇒ <code>number</code>
<p>returns the number of children of the relation.</p>

**Kind**: instance method of [<code>SpinalRelationRef</code>](#SpinalRelationRef)  
<a name="SpinalRelationRef+getChildren"></a>

### spinalRelationRef.getChildren() ⇒ <code>Promise.&lt;Array.&lt;SpinalNodeAny&gt;&gt;</code>
<p>Return all the children of the relation.</p>

**Kind**: instance method of [<code>SpinalRelationRef</code>](#SpinalRelationRef)  
**Returns**: <code>Promise.&lt;Array.&lt;SpinalNodeAny&gt;&gt;</code> - <p>The children of the relation</p>  
<a name="SpinalRelationRef+getChildrenInContext"></a>

### spinalRelationRef.getChildrenInContext(context) ⇒ <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code>
<p>Return all the children of the relation associated to a certain context.</p>

**Kind**: instance method of [<code>SpinalRelationRef</code>](#SpinalRelationRef)  
**Returns**: <code>Promise.&lt;Array.&lt;SpinalNode&gt;&gt;</code> - <p>The children of the relation associated to the context</p>  
**Throws**:

- <code>TypeError</code> <p>If the context is not a SpinalContext</p>


| Param | Type | Description |
| --- | --- | --- |
| context | [<code>SpinalContext</code>](#SpinalContext) | <p>The context to use for the search</p> |

<a name="SpinalRelationRef+getType"></a>

### spinalRelationRef.getType() ⇒ <code>string</code>
<p>Returns the type of the relation.</p>

**Kind**: instance method of [<code>SpinalRelationRef</code>](#SpinalRelationRef)  
**Returns**: <code>string</code> - <p>Type of the relation</p>  
<a name="SpinalRelationRef+addChild"></a>

### spinalRelationRef.addChild(node) ⇒ <code>Promise.&lt;SpinalNode.&lt;T&gt;&gt;</code>
<p>Adds a child to the relation.</p>

**Kind**: instance method of [<code>SpinalRelationRef</code>](#SpinalRelationRef)  
**Returns**: <code>Promise.&lt;SpinalNode.&lt;T&gt;&gt;</code> - <p>Promise containing the node that was added</p>  
**Throws**:

- <code>TypeError</code> <p>If the node is not a Model</p>
- <code>Error</code> <p>If the node is already a child of the relation</p>

**Template**: T extends spinal.Model = Node Element Type  

| Param | Type | Description |
| --- | --- | --- |
| node | <code>T</code> \| <code>SpinalNode.&lt;T&gt;</code> | <p>Node or model to add</p> |

<a name="SpinalRelationRef+removeChild"></a>

### spinalRelationRef.removeChild(node) ⇒ <code>Promise.&lt;void&gt;</code>
<p>Removes a child from the relation.</p>

**Kind**: instance method of [<code>SpinalRelationRef</code>](#SpinalRelationRef)  
**Returns**: <code>Promise.&lt;void&gt;</code> - <p>An empty promise</p>  
**Throws**:

- <code>Error</code> <p>If the given node is not a child</p>


| Param | Type | Description |
| --- | --- | --- |
| node | [<code>SpinalNode</code>](#SpinalNode) | <p>Child to remove</p> |

<a name="BaseSpinalRelation+getId"></a>

### spinalRelationRef.getId() ⇒ <code>spinal.Str</code>
<p>Shortcut to id.</p>

**Kind**: instance method of [<code>SpinalRelationRef</code>](#SpinalRelationRef)  
**Returns**: <code>spinal.Str</code> - <p>Id of the relation</p>  
<a name="BaseSpinalRelation+getName"></a>

### spinalRelationRef.getName() ⇒ <code>spinal.Str</code>
<p>Returns the name of the relation.</p>

**Kind**: instance method of [<code>SpinalRelationRef</code>](#SpinalRelationRef)  
**Returns**: <code>spinal.Str</code> - <p>Name of the relation</p>  
<a name="BaseSpinalRelation+getParent"></a>

### spinalRelationRef.getParent() ⇒ <code>Promise.&lt;SpinalNode.&lt;spinal.Model&gt;&gt;</code>
<p>Returns the parent of the relation.</p>

**Kind**: instance method of [<code>SpinalRelationRef</code>](#SpinalRelationRef)  
**Returns**: <code>Promise.&lt;SpinalNode.&lt;spinal.Model&gt;&gt;</code> - <p>Returns a promise where the resolve is the parent</p>  
<a name="BaseSpinalRelation+addContextId"></a>

### spinalRelationRef.addContextId(id)
<p>Adds an id to the context ids of the relation.</p>

**Kind**: instance method of [<code>SpinalRelationRef</code>](#SpinalRelationRef)  
**Throws**:

- <code>TypeError</code> <p>If the id is not a string</p>


| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | <p>Id of the context</p> |

<a name="BaseSpinalRelation+getContextIds"></a>

### spinalRelationRef.getContextIds() ⇒ <code>Array.&lt;string&gt;</code>
<p>Returns a list of the contexts the relation is associated to.</p>

**Kind**: instance method of [<code>SpinalRelationRef</code>](#SpinalRelationRef)  
**Returns**: <code>Array.&lt;string&gt;</code> - <p>A list of ids of the associated contexts</p>  
<a name="BaseSpinalRelation+belongsToContext"></a>

### spinalRelationRef.belongsToContext(context) ⇒ <code>boolean</code>
<p>Returns true if the relation belongs to the context.</p>

**Kind**: instance method of [<code>SpinalRelationRef</code>](#SpinalRelationRef)  
**Returns**: <code>boolean</code> - <p>A boolean</p>  
**Throws**:

- <code>TypeError</code> <p>If the context is not a SpinalContext</p>


| Param | Type | Description |
| --- | --- | --- |
| context | <code>SpinalContext.&lt;T&gt;</code> | <p>The context that might own the node</p> |

<a name="BaseSpinalRelation+removeChildren"></a>

### spinalRelationRef.removeChildren([nodesToDelete]) ⇒ <code>Promise.&lt;void&gt;</code>
<p>Removes children from the relation.</p>

**Kind**: instance method of [<code>SpinalRelationRef</code>](#SpinalRelationRef)  
**Returns**: <code>Promise.&lt;void&gt;</code> - <p>An empty promise</p>  
**Throws**:

- <code>TypeError</code> <p>If nodes is not an array or omitted</p>
- <code>Error</code> <p>If one of the nodes is not a child</p>


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [nodesToDelete] | <code>Array.&lt;SpinalNode.&lt;spinal.Model&gt;&gt;</code> | <code>[]</code> | <p>Childs to remove</p> |

<a name="BaseSpinalRelation+removeFromGraph"></a>

### spinalRelationRef.removeFromGraph() ⇒ <code>Promise.&lt;void&gt;</code>
<p>Removes the relation from the graph.</p>

**Kind**: instance method of [<code>SpinalRelationRef</code>](#SpinalRelationRef)  
**Returns**: <code>Promise.&lt;void&gt;</code> - <p>An empty promise</p>  
<a name="SpinalRelationRef.SpinalRelationRef"></a>

### SpinalRelationRef.SpinalRelationRef
**Kind**: static class of [<code>SpinalRelationRef</code>](#SpinalRelationRef)  
<a name="new_SpinalRelationRef.SpinalRelationRef_new"></a>

#### new SpinalRelationRef(parent, name)
<p>Constructor for the SpinalRelationRef class.</p>

**Throws**:

- <code>TypeError</code> <p>If the parent is not a node</p>
- <code>TypeError</code> <p>If the name is not a string</p>


| Param | Type | Description |
| --- | --- | --- |
| parent | [<code>SpinalNode</code>](#SpinalNode) | <p>Parent of the relation</p> |
| name | <code>string</code> | <p>Name of the relation</p> |

<a name="SpinalMap"></a>

## SpinalMap ⇐ <code>Model</code>
**Kind**: global class  
**Extends**: <code>Model</code>  
**Template**: T  

* [SpinalMap](#SpinalMap) ⇐ <code>Model</code>
    * _instance_
        * [.setElement(key, value)](#SpinalMap+setElement)
        * [.getElement(key)](#SpinalMap+getElement) ⇒ <code>T</code>
        * [.has(key)](#SpinalMap+has) ⇒ <code>boolean</code>
        * [.hasKey()](#SpinalMap+hasKey) ⇒ <code>boolean</code>
        * [.keys()](#SpinalMap+keys) ⇒ <code>Array.&lt;string&gt;</code>
        * [.entries()](#SpinalMap+entries) ⇒ <code>Array.&lt;Array.&lt;string, T&gt;&gt;</code>
        * [.delete(key)](#SpinalMap+delete)
        * [.clear()](#SpinalMap+clear)
        * [.forEach(fun)](#SpinalMap+forEach)
    * _static_
        * [.SpinalMap](#SpinalMap.SpinalMap)
            * [new SpinalMap([init])](#new_SpinalMap.SpinalMap_new)

<a name="SpinalMap+setElement"></a>

### spinalMap.setElement(key, value)
<p>Sets the value corresponding to the key.</p>

**Kind**: instance method of [<code>SpinalMap</code>](#SpinalMap)  
**Throws**:

- <code>TypeError</code> <p>If the key is not a string</p>


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | <p>Key to the value</p> |
| value | <code>T</code> | <p>New value</p> |

<a name="SpinalMap+getElement"></a>

### spinalMap.getElement(key) ⇒ <code>T</code>
<p>Returns the value associated to the key, or undefined if there is none.</p>

**Kind**: instance method of [<code>SpinalMap</code>](#SpinalMap)  
**Returns**: <code>T</code> - <p>Value corresponding to the key</p>  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | <p>Key to the value</p> |

<a name="SpinalMap+has"></a>

### spinalMap.has(key) ⇒ <code>boolean</code>
<p>Returns a boolean asserting whether a value has been associated to the key or not.</p>

**Kind**: instance method of [<code>SpinalMap</code>](#SpinalMap)  
**Returns**: <code>boolean</code> - <p>Return true if the key exists</p>  
**Throws**:

- <code>TypeError</code> <p>If the key is not a string</p>


| Param | Type |
| --- | --- |
| key | <code>string</code> | 

<a name="SpinalMap+hasKey"></a>

### spinalMap.hasKey() ⇒ <code>boolean</code>
<p>Returns a boolean asserting whether the map contains any key.</p>

**Kind**: instance method of [<code>SpinalMap</code>](#SpinalMap)  
**Returns**: <code>boolean</code> - <p>Return true if the map contains at least one key</p>  
<a name="SpinalMap+keys"></a>

### spinalMap.keys() ⇒ <code>Array.&lt;string&gt;</code>
<p>Returns an array that contains the keys for each element in the map in insertion order.</p>

**Kind**: instance method of [<code>SpinalMap</code>](#SpinalMap)  
**Returns**: <code>Array.&lt;string&gt;</code> - <p>Array containing all the keys in the map</p>  
<a name="SpinalMap+entries"></a>

### spinalMap.entries() ⇒ <code>Array.&lt;Array.&lt;string, T&gt;&gt;</code>
<p>Returns an array that contains the keys and the values
for each element in the map in insertion order.</p>

**Kind**: instance method of [<code>SpinalMap</code>](#SpinalMap)  
**Returns**: <code>Array.&lt;Array.&lt;string, T&gt;&gt;</code> - <p>Array containing all the keys and values in the map</p>  
<a name="SpinalMap+delete"></a>

### spinalMap.delete(key)
<p>Deletes an element.</p>

**Kind**: instance method of [<code>SpinalMap</code>](#SpinalMap)  
**Throws**:

- <code>TypeError</code> <p>If the key is not a string</p>
- <code>Error</code> <p>If the key is not in the map</p>


| Param | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | <p>Key of the element</p> |

<a name="SpinalMap+clear"></a>

### spinalMap.clear()
<p>Deletes all elements.</p>

**Kind**: instance method of [<code>SpinalMap</code>](#SpinalMap)  
<a name="SpinalMap+forEach"></a>

### spinalMap.forEach(fun)
<p>Applies a function to each of the values in the map.</p>

**Kind**: instance method of [<code>SpinalMap</code>](#SpinalMap)  

| Param | Type | Description |
| --- | --- | --- |
| fun | <code>SpinalMapForEachFunc.&lt;T&gt;</code> | <p>Funcion to apply</p> |

<a name="SpinalMap.SpinalMap"></a>

### SpinalMap.SpinalMap
**Kind**: static class of [<code>SpinalMap</code>](#SpinalMap)  
<a name="new_SpinalMap.SpinalMap_new"></a>

#### new SpinalMap([init])
<p>Constructor for the SpinalMap class.</p>

**Throws**:

- <code>TypeError</code> <p>If init is not iterable</p>
- <code>TypeError</code> <p>If init[Symbol.iterator] doesn't return iterators</p>
- <code>TypeError</code> <p>If the values of the iterators are not arrays of key values</p>
- <code>TypeError</code> <p>If the keys of the values of the iterators are not strings</p>


| Param | Type | Description |
| --- | --- | --- |
| [init] | <code>Array.&lt;ArrayPairStringAny&gt;</code> | <p>Array of arrays of key-value pairs</p> |

<a name="SpinalNodePointer"></a>

## SpinalNodePointer ⇐ <code>Model</code>
**Kind**: global class  
**Extends**: <code>Model</code>  
**Template**: T extends spinal.Model  

* [SpinalNodePointer](#SpinalNodePointer) ⇐ <code>Model</code>
    * [new SpinalNodePointer()](#new_SpinalNodePointer_new)
    * _instance_
        * [.setElement(element)](#SpinalNodePointer+setElement)
        * [.load()](#SpinalNodePointer+load) ⇒ <code>Promise.&lt;T&gt;</code>
        * [.unset()](#SpinalNodePointer+unset)
        * [.getId()](#SpinalNodePointer+getId) ⇒ <code>spinal.Str</code>
        * [.getType()](#SpinalNodePointer+getType) ⇒ <code>spinal.Str</code>
    * _static_
        * [.SpinalNodePointer](#SpinalNodePointer.SpinalNodePointer)
            * [new SpinalNodePointer(element)](#new_SpinalNodePointer.SpinalNodePointer_new)

<a name="new_SpinalNodePointer_new"></a>

### new SpinalNodePointer()
<p>Wrapper over SpinalNodePointer containing some information about the pointed element</p>

<a name="SpinalNodePointer+setElement"></a>

### spinalNodePointer.setElement(element)
<p>Sets pointer to point to an element.</p>

**Kind**: instance method of [<code>SpinalNodePointer</code>](#SpinalNodePointer)  
**Throws**:

- <code>TypeError</code> <p>If the element is not a Model</p>


| Param | Type | Description |
| --- | --- | --- |
| element | <code>T</code> | <p>Element to point to</p> |

<a name="SpinalNodePointer+load"></a>

### spinalNodePointer.load() ⇒ <code>Promise.&lt;T&gt;</code>
<p>Loads the model to which the pointer is pointing.</p>

**Kind**: instance method of [<code>SpinalNodePointer</code>](#SpinalNodePointer)  
**Returns**: <code>Promise.&lt;T&gt;</code> - <p>The model to which the pointer is pointing</p>  
<a name="SpinalNodePointer+unset"></a>

### spinalNodePointer.unset()
<p>Unsets the pointer. The pointer shouldn't be used after that.</p>

**Kind**: instance method of [<code>SpinalNodePointer</code>](#SpinalNodePointer)  
<a name="SpinalNodePointer+getId"></a>

### spinalNodePointer.getId() ⇒ <code>spinal.Str</code>
<p>Returns the id of the pointed element.</p>

**Kind**: instance method of [<code>SpinalNodePointer</code>](#SpinalNodePointer)  
**Returns**: <code>spinal.Str</code> - <p>Id of the pointed element</p>  
<a name="SpinalNodePointer+getType"></a>

### spinalNodePointer.getType() ⇒ <code>spinal.Str</code>
<p>This function returns the type of the pointed element.</p>

**Kind**: instance method of [<code>SpinalNodePointer</code>](#SpinalNodePointer)  
**Returns**: <code>spinal.Str</code> - <p>Type of the pointed element</p>  
<a name="SpinalNodePointer.SpinalNodePointer"></a>

### SpinalNodePointer.SpinalNodePointer
**Kind**: static class of [<code>SpinalNodePointer</code>](#SpinalNodePointer)  
<a name="new_SpinalNodePointer.SpinalNodePointer_new"></a>

#### new SpinalNodePointer(element)
<p>Constructor for the SpinalNodePointer class.</p>


| Param | Type | Description |
| --- | --- | --- |
| element | <code>T</code> | <p>Element to wich the SpinalNodePointer will point</p> |

<a name="SpinalSet"></a>

## SpinalSet ⇐ <code>Model</code>
**Kind**: global class  
**Extends**: <code>Model</code>  

* [SpinalSet](#SpinalSet) ⇐ <code>Model</code>
    * _instance_
        * [.add(value)](#SpinalSet+add)
        * [.has(value)](#SpinalSet+has) ⇒ <code>boolean</code>
        * [.values()](#SpinalSet+values) ⇒ <code>Array.&lt;string&gt;</code>
        * [.delete(value)](#SpinalSet+delete)
        * [.clear()](#SpinalSet+clear)
        * [.size()](#SpinalSet+size) ⇒ <code>number</code>
        * [.forEach(fun)](#SpinalSet+forEach)
    * _static_
        * [.SpinalSet](#SpinalSet.SpinalSet)
            * [new SpinalSet([init])](#new_SpinalSet.SpinalSet_new)

<a name="SpinalSet+add"></a>

### spinalSet.add(value)
<p>Appends a new element with the given value to the set.</p>

**Kind**: instance method of [<code>SpinalSet</code>](#SpinalSet)  
**Throws**:

- <code>TypeError</code> <p>If the value is not a string</p>


| Param | Type | Description |
| --- | --- | --- |
| value | <code>String</code> | <p>Value to store in the set</p> |

<a name="SpinalSet+has"></a>

### spinalSet.has(value) ⇒ <code>boolean</code>
<p>Returns a boolean asserting whether the value is in the set or not.</p>

**Kind**: instance method of [<code>SpinalSet</code>](#SpinalSet)  
**Returns**: <code>boolean</code> - <p>Return true if the value exists</p>  
**Throws**:

- <code>TypeError</code> <p>If the value is not a string</p>


| Param | Type | Description |
| --- | --- | --- |
| value | <code>string</code> | <p>Value</p> |

<a name="SpinalSet+values"></a>

### spinalSet.values() ⇒ <code>Array.&lt;string&gt;</code>
<p>Returns an array that contains all the values of the set.</p>

**Kind**: instance method of [<code>SpinalSet</code>](#SpinalSet)  
**Returns**: <code>Array.&lt;string&gt;</code> - <p>Array containing all the values in the set</p>  
<a name="SpinalSet+delete"></a>

### spinalSet.delete(value)
<p>Deletes an element.</p>

**Kind**: instance method of [<code>SpinalSet</code>](#SpinalSet)  
**Throws**:

- <code>TypeError</code> <p>If the value is not a string</p>
- <code>Error</code> <p>If the value is not in the map</p>


| Param | Type | Description |
| --- | --- | --- |
| value | <code>string</code> | <p>Value to delete</p> |

<a name="SpinalSet+clear"></a>

### spinalSet.clear()
<p>Deletes all values in the set.</p>

**Kind**: instance method of [<code>SpinalSet</code>](#SpinalSet)  
<a name="SpinalSet+size"></a>

### spinalSet.size() ⇒ <code>number</code>
<p>Returns the number of values in the set.</p>

**Kind**: instance method of [<code>SpinalSet</code>](#SpinalSet)  
**Returns**: <code>number</code> - <p>Number of values in the set</p>  
<a name="SpinalSet+forEach"></a>

### spinalSet.forEach(fun)
<p>Applies a function to each of the values in the set.</p>

**Kind**: instance method of [<code>SpinalSet</code>](#SpinalSet)  

| Param | Type | Description |
| --- | --- | --- |
| fun | <code>SpinalSetForEachFunc</code> | <p>Funcion to apply</p> |

<a name="SpinalSet.SpinalSet"></a>

### SpinalSet.SpinalSet
**Kind**: static class of [<code>SpinalSet</code>](#SpinalSet)  
<a name="new_SpinalSet.SpinalSet_new"></a>

#### new SpinalSet([init])
<p>Constructor for the SpinalSet class.</p>

**Throws**:

- <code>TypeError</code> <p>If init is not iterable</p>
- <code>TypeError</code> <p>If init[Symbol.iterator] doesn't return iterators</p>
- <code>TypeError</code> <p>If the values of the iterators are not strings</p>


| Param | Type | Description |
| --- | --- | --- |
| [init] | <code>Array.&lt;string&gt;</code> \| <code>IterableIterator.&lt;string&gt;</code> | <p>Array of values</p> |

<a name="RELATION_TYPE_LIST"></a>

## *RELATION\_TYPE\_LIST*
<p>Namespace for general relation functions.</p>

**Kind**: global abstract variable  
<a name="s4"></a>

## s4() ⇒ <code>String</code>
<p>Generates a random number and returns in a string.</p>

**Kind**: global function  
**Returns**: <code>String</code> - <p>Random number in a string</p>  
<a name="guid"></a>

## guid(name) ⇒ <code>string</code>
<p>Creates a unique id based on a name.</p>

**Kind**: global function  
**Returns**: <code>string</code> - <p>Generated id</p>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | <p>Name from wich the id is generated</p> |

